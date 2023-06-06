import Link from 'next/link'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-10">Create a Card</h1>
      <div className="flex gap-4">
        <Link href="/digital" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Digital Card
        </Link>
        <Link href="/images" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Card Image
        </Link>
      </div>
    </div>
  )
}

export default HomePage
