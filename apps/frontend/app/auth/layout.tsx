export const metadata = {
  title: 'تسجيل الدخول الي IAFCE',
  description: 'تسجيل الدخول الي IAFCE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {children}
    </div>
  )
}
