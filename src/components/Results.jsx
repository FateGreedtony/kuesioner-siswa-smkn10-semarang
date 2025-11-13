import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Button, Tag, Divider } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, BulbOutlined } from '@ant-design/icons';
import { questions } from '../question/index.js';
import Navbar from './Navbar';

const { Title, Text, Paragraph } = Typography;

const recommendations = {
  'Kinestetik Jasmani': 'Kinestetik',
  'Musikal Ritmis': 'Audio',
  'Visual Spasial': 'Audio-visual',
  'Verbal Linguistik': 'Audio-visual',
  'Logis Matematis': 'Audio-visual',
  'Intrapersonal': 'Audio-visual',
  'Interpersonal': 'Audio-visual',
  'Naturalis': 'Kinestetik'
};

const getCompetence = (score) => {
  if (score >= 9) return 'Sangat Kompeten';
  if (score >= 7) return 'Kompeten';
  if (score >= 5) return 'Cukup Kompeten';
  return 'Tidak Kompeten';
};

export default function Results() {
  const [results, setResults] = useState([]);
  const [studentClass, setStudentClass] = useState('');
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('answers') || '{}');
    const cls = localStorage.getItem('studentClass') || '';
    const name = localStorage.getItem('studentName') || '';
    setStudentClass(cls);
    setStudentName(name);

    const res = questions.map((intel, index) => {
      // Gunakan key unik yang sama dengan format di Questionnaire
      const total = intel.data.reduce((sum, q) => {
        const uniqueKey = `${index + 1}-${q.id}`;
        return sum + (answers[uniqueKey] || 0);
      }, 0);
      const score = total / 5; // 10 questions / 5
      return {
        name: intel.name,
        score: score.toFixed(1),
        competence: getCompetence(score),
        recommendation: recommendations[intel.name]
      };
    });
    setResults(res);
  }, []);

  const competentResults = results.filter(r => r.competence !== 'Tidak Kompeten');

  const handleReset = () => {
    // Hapus semua data dari localStorage
    localStorage.removeItem('answers');
    localStorage.removeItem('studentClass');
    localStorage.removeItem('studentName');
    // Redirect ke halaman utama
    window.location.href = '/';
  };

  const getCompetenceColor = (competence) => {
    switch(competence) {
      case 'Sangat Kompeten': return 'green';
      case 'Kompeten': return 'blue';
      case 'Cukup Kompeten': return 'orange';
      default: return 'red';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto p-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-6 border-0 shadow-lg bg-blue-900 text-white">
            <Title level={2} className="text-center text-white mb-4">
              <TrophyOutlined className="mr-3" />Hasil Kuesioner Kecerdasan
            </Title>
          </Card>

          <Card className="mb-6 border-0 shadow-lg">
            <Title level={4} className="text-blue-900 mb-4">
              <UserOutlined className="mr-2" />Data Diri Siswa
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <UserOutlined className="text-blue-900 text-xl mr-3" />
                <div>
                  <Text className="text-gray-500 text-sm block">Nama Lengkap</Text>
                  <Text strong className="text-lg">{studentName}</Text>
                </div>
              </div>
              <div className="flex items-center">
                <TeamOutlined className="text-blue-900 text-xl mr-3" />
                <div>
                  <Text className="text-gray-500 text-sm block">Kelas</Text>
                  <Text strong className="text-lg">{studentClass}</Text>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6 border-0 shadow-lg">
            <Title level={4} className="text-blue-900 mb-4">
              <BulbOutlined className="mr-2" />Hasil Analisis Kecerdasan
            </Title>
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
              dataSource={results}
              renderItem={item => (
                <List.Item>
                  <Card className="h-full border-l-4 border-l-blue-900 hover:shadow-md transition-shadow">
                    <Title level={5} className="text-blue-900 mb-3">{item.name}</Title>
                    <div className="space-y-2">
                      <div>
                        <Text className="text-gray-600">Skor: </Text>
                        <Text strong className="text-xl">{item.score}</Text>
                      </div>
                      <div>
                        <Tag color={getCompetenceColor(item.competence)} className="text-sm px-3 py-1">
                          {item.competence}
                        </Tag>
                      </div>
                      <div>
                        <Text className="text-gray-600">Rekomendasi: </Text>
                        <Tag color="blue">{item.recommendation}</Tag>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>

          {competentResults.length > 0 && (
            <Card className="mb-6 border-0 shadow-lg bg-linear-to-r from-blue-900 to-blue-800 text-white">
              <Title level={4} className="text-white mb-4">
                <BulbOutlined className="mr-2" />Rekomendasi Gaya Belajar Utama
              </Title>
              <Paragraph className="text-white text-lg mb-3">
                Berdasarkan hasil analisis, gaya belajar yang sesuai untuk Anda:
              </Paragraph>
              <div className="flex flex-wrap gap-3">
                {[...new Set(competentResults.map(r => r.recommendation))].map(rec => (
                  <Tag key={rec} color="white" className="text-blue-900 text-lg px-4 py-2 font-semibold">
                    {rec}
                  </Tag>
                ))}
              </div>
            </Card>
          )}

          <Button 
            type="primary" 
            size="large" 
            block 
            className="bg-blue-900 hover:bg-blue-800 border-0 h-12 text-lg font-semibold" 
            onClick={handleReset}
          >
            Mulai Lagi
          </Button>
        </div>
      </div>
    </div>
  );
}