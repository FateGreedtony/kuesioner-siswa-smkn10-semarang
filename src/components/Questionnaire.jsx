import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Radio, Button, Card, Typography, Space, Progress } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { questions } from '../question/index.js';
import Navbar from './Navbar';

const { Title, Text } = Typography;

export default function Questionnaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const intelligenceIndex = parseInt(id) - 1;
  const intelligence = questions[intelligenceIndex];

  const [answers, setAnswers] = useState({});
  const [showInstructions, setShowInstructions] = useState(id === '1');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleChange = (qId, value) => {
    // Buat key unik dengan menggabungkan intelligence id dan question id
    const uniqueKey = `${intelligenceIndex + 1}-${qId}`;
    const newAnswers = { ...answers, [uniqueKey]: value };
    setAnswers(newAnswers);
    localStorage.setItem('answers', JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (parseInt(id) < 8) {
      navigate(`/questionnaire/${parseInt(id) + 1}`);
    } else {
      navigate('/results');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (parseInt(id) > 1) {
      navigate(`/questionnaire/${parseInt(id) - 1}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!intelligence) return <div>Kecerdasan tidak ditemukan</div>;

  const progress = (parseInt(id) / 8) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 relative">
      <Navbar />
      <div className="container mx-auto p-4 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-4 border-0 shadow-lg">
            <Progress percent={progress} strokeColor="#1e3a8a" showInfo={false} className="mb-5" />
            <Text className="text-sm text-gray-600">Bagian {id} dari 8</Text>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <Title level={2} className="text-center text-blue-900 mb-6">{intelligence.name}</Title>
            {showInstructions && (
              <Card 
                className="mb-6 border-0 shadow-xl"
                style={{
                  background: '#eff6ff',
                  color: '#434cb5',
                  'margin-bottom': '20px', 
                  'border': '2px solid #3b82f6'
                }}
              >
                <div className="space-y-2">
                  <p strong className=" text-lg block mb-2">📋 Petunjuk Penilaian:</p>
                  <p className="block">1 = Sangat Tidak Setuju (STS)</p>
                  <p className=" block">2 = Tidak Setuju (TS)</p>
                  <p className=" block">3 = Agak Setuju (AS)</p>
                  <p className=" block">4 = Setuju (S)</p>
                  <p className=" block">5 = Sangat Setuju (SS)</p>
                </div>
              </Card>
            )}
            <Space direction="vertical" className="w-full" size="large">
              {intelligence.data.map(q => {
                const uniqueKey = `${intelligenceIndex + 1}-${q.id}`;
                return (
                <div key={q.id} className="p-4 bg-gray-100 rounded-lg">
                  <Text strong className="text-base text-gray-800 block mb-3">{q.id}. {q.question_text}</Text>
                  <Radio.Group
                    value={answers[uniqueKey] || null}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="mt-3 w-full"
                  >
                    <div className="flex justify-center gap-4 flex-wrap">
                      {[1, 2, 3, 4, 5].map(num => (
                        <label 
                          key={num}
                          className={`cursor-pointer flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all ${
                            answers[uniqueKey] === num 
                              ? 'bg-blue-900 border-blue-900 text-white shadow-lg scale-110' 
                              : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:shadow-md'
                          }`}
                          onClick={() => handleChange(q.id, num)}
                        >
                          <input 
                            type="radio" 
                            value={num} 
                            checked={answers[uniqueKey] === num}
                            onChange={() => {}}
                            className="hidden"
                          />
                          <span className="font-semibold text-xl sm:text-2xl">{num}</span>
                        </label>
                      ))}
                    </div>
                  </Radio.Group>
                </div>
              )})}
            </Space>
            <div className="flex justify-between mt-8 gap-4">
              <Button 
                size="large" 
                onClick={handlePrev} 
                disabled={id === '1'}
                icon={<LeftOutlined />}
                className="flex items-center"
              >
                Sebelumnya
              </Button>
              <Button 
                type="primary" 
                size="large" 
                onClick={handleNext}
                className="bg-blue-900 hover:bg-blue-800 border-0 flex items-center"
                icon={id === '8' ? null : <RightOutlined />}
                iconPosition="end"
              >
                {id === '8' ? 'Selesai' : 'Selanjutnya'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}