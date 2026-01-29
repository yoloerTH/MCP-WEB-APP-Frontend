import { createContext, useEffect, useState, useRef, ReactNode } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface PersonalizationData {
  id?: string
  user_id?: string
  full_name?: string
  preferred_name?: string
  occupation_type?: 'student' | 'professional' | 'business_owner' | 'freelancer' | 'other'
  job_title?: string
  company_organization?: string
  industry?: string
  primary_work_focus?: string
  common_tools?: string[]
  typical_tasks?: string[]
  communication_style?: 'formal' | 'casual' | 'concise' | 'detailed'
  timezone?: string
  ai_context_summary?: string
  completed_onboarding?: boolean
  created_at?: string
  updated_at?: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
  hasPersonalization: boolean
  personalizationData: PersonalizationData | null
  personalizationLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  fetchPersonalization: () => Promise<void>
  updatePersonalization: (data: PersonalizationData) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)
  const [hasPersonalization, setHasPersonalization] = useState(false)
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData | null>(null)
  const [personalizationLoading, setPersonalizationLoading] = useState(false)
  const lastFetchedUserIdRef = useRef<string | null>(null)

  const fetchPersonalization = async () => {
    console.log('🔍 fetchPersonalization called, user.id:', user?.id)

    if (!user?.id) {
      console.log('❌ No user ID, skipping fetch')
      setHasPersonalization(false)
      setPersonalizationData(null)
      setPersonalizationLoading(false)
      lastFetchedUserIdRef.current = null
      return
    }

    // Prevent duplicate fetches for the same user
    if (lastFetchedUserIdRef.current === user.id) {
      console.log('⏭️ Already fetched for this user, skipping')
      return
    }

    lastFetchedUserIdRef.current = user.id
    setPersonalizationLoading(true)
    console.log('⏳ Fetching personalization from Supabase...')

    try {
      const { data, error } = await supabase
        .from('user_personalization')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) {
        console.error('❌ Error fetching personalization:', error)
        setHasPersonalization(false)
        setPersonalizationData(null)
      } else if (data) {
        console.log('✅ Personalization data loaded:', data)
        console.log('✅ completed_onboarding:', data.completed_onboarding)
        setPersonalizationData(data)
        setHasPersonalization(data.completed_onboarding === true)
      } else {
        console.log('ℹ️ No personalization data exists yet')
        setHasPersonalization(false)
        setPersonalizationData(null)
      }
    } catch (err) {
      console.error('❌ Error fetching personalization:', err)
    } finally {
      setPersonalizationLoading(false)
      console.log('✅ Personalization loading complete. hasPersonalization:', hasPersonalization)
    }
  }

  const updatePersonalization = async (data: PersonalizationData) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    try {
      const payload = {
        ...data,
        user_id: user.id,
        completed_onboarding: true,
      }

      const { error } = await supabase
        .from('user_personalization')
        .upsert(payload, { onConflict: 'user_id' })

      if (error) throw error

      // Reset ref to allow refetch and then refetch personalization data
      lastFetchedUserIdRef.current = null
      await fetchPersonalization()
    } catch (err) {
      console.error('Error updating personalization:', err)
      throw err
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error)
        setError(error)
      }
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Fetch personalization if user exists
      if (session?.user) {
        fetchPersonalization()
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      setError(null)

      // Fetch personalization when user signs in
      if (session?.user) {
        fetchPersonalization()
      } else {
        setHasPersonalization(false)
        setPersonalizationData(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setError(error as AuthError)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      setError(error as AuthError)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    error,
    hasPersonalization,
    personalizationData,
    personalizationLoading,
    signInWithGoogle,
    signOut,
    fetchPersonalization,
    updatePersonalization,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
