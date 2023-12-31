export function avatarURL(avatar?: string | null) {
  const supabaseURL =
    'https://eqnqmpzeyldkgstjtqdj.supabase.co/storage/v1/object/public/gesb2/avatar/'

  if (avatar === null) {
    return ''
  } else {
    return `${supabaseURL}${avatar}`
  }
}
