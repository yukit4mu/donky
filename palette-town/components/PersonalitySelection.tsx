import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PersonalityBlock from './PersonalityBlock'

interface PersonalitySelectionProps {
  onSubmit: (personalities: string[]) => void
  userName: string
}

const personalities = [
  '外向性', '内向性', '誠実性', '開放性', '協調性', '神経質',
  'リーダーシップ', '創造性', '感情表現性', '柔軟性', '怠惰性', '直感性'
]

export default function PersonalitySelection({ onSubmit, userName }: PersonalitySelectionProps) {
  const [selected, setSelected] = useState<string[]>([])

  const togglePersonality = (personality: string) => {
    if (selected.includes(personality)) {
      setSelected(selected.filter(p => p !== personality))
    } else if (selected.length < 5) {
      setSelected([...selected, personality])
    }
  }

  const handleSubmit = () => {
    if (selected.length === 5) {
      onSubmit(selected)
    }
  }

  return (
    <div className="space-y-6 w-full max-w-4xl p-8 bg-card rounded-3xl shadow-lg border-4 border-primary">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">{userName}さん、5つのパーソナリティを選んでください</h1>
        <p className="text-muted-foreground mt-2">あなたらしさを表す特徴を選びましょう</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {personalities.map((personality) => (
          <Card
            key={personality}
            className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl ${
              selected.includes(personality) 
                ? 'bg-primary text-primary-foreground shadow-lg transform scale-105' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
            onClick={() => togglePersonality(personality)}
          >
            <PersonalityBlock personality={personality} />
            <p className="mt-2 text-center font-bold">{personality}</p>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <p className="text-center text-lg text-muted-foreground">選択済み: {selected.join(', ')}</p>
        <Button
          onClick={handleSubmit}
          disabled={selected.length !== 5}
          className="w-full text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
        >
          結果を見る
        </Button>
      </div>
    </div>
  )
}

