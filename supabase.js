import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase project details
const SUPABASE_URL = "https://giwysdzsyqjrrwefpnyf.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpd3lzZHpzeXFqcnJ3ZWZwbnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNzg2MDQsImV4cCI6MjA3Mjk1NDYwNH0.jKr25LKcPo6kn9_AphQ57bzHaKIgKBpWTuIfbXwixdo"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// -------- Auth functions --------
export async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })
  if (error) console.error(error)
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// -------- Feed functions --------
export async function getPosts(limit = 20) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) console.error(error)
  return data || []
}

export async function createPost(user_id, content, file=null) {
  let media = null
  if (file) {
    const { data: uploadData, error } = await supabase.storage
      .from('public-media')
      .upload(`posts/${Date.now()}-${file.name}`, file)
    if (error) throw error
    media = supabase.storage.from('public-media')
      .getPublicUrl(uploadData.path).data.publicUrl
  }

  const { error } = await supabase.from('posts').insert([
    { user_id, content, media: media ? [{ url: media }] : [] }
  ])
  if (error) console.error(error)
}
