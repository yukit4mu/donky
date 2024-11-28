import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface UserNameInputProps {
  onSubmit: (name: string) => void
}

export default function UserNameInput({ onSubmit }: UserNameInputProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-card rounded-3xl shadow-lg max-w-md w-full border-4 border-primary">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">Pallete Town</h1>
      </div>
      <Input
        type="text"
        placeholder="お名前を入力してください"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-lg rounded-full border-2 border-secondary focus:border-primary"
        aria-label="お名前"
      />
      <Button type="submit" className="w-full text-lg font-bold rounded-full bg-primary hover:bg-primary/90">
        はじめる
      </Button>
    </form>
  )
}

