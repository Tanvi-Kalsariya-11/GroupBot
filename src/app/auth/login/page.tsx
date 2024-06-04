import LoginForm from '@/components/LoginForm'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
//   const session = (await auth()) as Session

//   if (session) {
//     redirect('/chat')
//   }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
