'use client'

import { useState } from 'react'
import UserNameInput from '../components/UserNameInput'
import PersonalitySelection from '../components/PersonalitySelection'
import PersonalityResult from '../components/PersonalityResult'

export default function PaletteTown() {
  const [userName, setUserName] = useState('')
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([])
  const [currentScreen, setCurrentScreen] = useState('userName')

  const handleUserNameSubmit = (name: string) => {
    setUserName(name)
    setCurrentScreen('personalitySelection')
  }

  const handlePersonalitySubmit = (personalities: string[]) => {
    setSelectedPersonalities(personalities)
    setCurrentScreen('personalityResult')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      {currentScreen === 'userName' && (
        <UserNameInput onSubmit={handleUserNameSubmit} />
      )}
      {currentScreen === 'personalitySelection' && (
        <PersonalitySelection onSubmit={handlePersonalitySubmit} userName={userName} />
      )}
      {currentScreen === 'personalityResult' && (
        <PersonalityResult personalities={selectedPersonalities} userName={userName} />
      )}
    </div>
  )
}

