import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SecretRecoveryPhrase = () => {
  const [words, setWords] = useState(Array(12).fill(''));
  const [isLong, setIsLong] = useState(false);
  const handleWordChange = (index: any, value: any) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handlelength = () => {
    setIsLong(prevstate => !prevstate)
  };

  const handleSubmit = () => {

  }

  useEffect(() => {
    setWords(Array(isLong ? 24 : 12).fill(''));
  }, [isLong])

  const isButtonDisabled = words.some(word => word.trim() === '');




  return (
    <div className="flex flex-col items-center justify-center  p-8">
      <h1 className="text-3xl font-bold text-white mb-3">Secret Recovery Phrase</h1>
      <p className="text-gray-400 mb-6">Enter or paste your 12 or 24-word phrase.</p>

      <button
        onClick={handlelength}
        className="text-blue-500 hover:underline mb-8"
      >
        Use {isLong ? 24 : 12} words
      </button>

      <div className="grid grid-cols-3 gap-4 w-full max-w-xl mb-12">
        {words.map((word, index) => (
          <div key={index} className="relative">
            <label className="absolute top-[33%] left-2 text-gray-400 text-sm">{index + 1}</label>
            <Input
              type="text"
              value={word}
              onChange={(e) => handleWordChange(index, e.target.value)}
              className="h-[52px] text-lg px-5 pl-7 bg-[#292B31] text-white placeholder:text-[#969faf]"
            />
          </div>
        ))}
      </div>
      <div className='w-full mt-14 flex items-center justify-center'>
        <Button
          className='w-64 h-14 font-bold text-lg'
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Import
        </Button>
      </div>
    </div>
  );
};

export default SecretRecoveryPhrase;


