import React, { useState, useEffect } from 'react';
import { Card, Typography, List, Button, Tag, Divider, Modal, Collapse } from 'antd';
import { UserOutlined, TeamOutlined, TrophyOutlined, BulbOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
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

const learningStyleDescriptions = {
  'Kinestetik': {
    description: 'Gaya belajar kinestetik adalah gaya belajar dengan cara bergerak, bekerja, dan menyentuh. Pembelajar kinestetik lebih suka belajar melalui praktek langsung, eksperimen, dan aktivitas fisik.',
    tips: [
      'Belajar sambil bergerak atau berjalan',
      'Menggunakan model atau alat peraga',
      'Melakukan eksperimen dan praktek langsung',
      'Membuat proyek atau simulasi'
    ]
  },
  'Audio': {
    description: 'Gaya belajar audio adalah gaya belajar dengan cara mendengar. Pembelajar audio lebih mudah menyerap informasi melalui suara, musik, diskusi, dan penjelasan lisan.',
    tips: [
      'Mendengarkan rekaman atau podcast',
      'Berdiskusi dengan teman atau guru',
      'Membaca dengan suara keras',
      'Menggunakan musik sebagai latar belajar'
    ]
  },
  'Audio-visual': {
    description: 'Gaya belajar audio-visual menggabungkan pendengaran dan penglihatan. Pembelajar ini efektif belajar melalui video, presentasi, diagram yang dijelaskan, dan demonstrasi visual dengan narasi.',
    tips: [
      'Menonton video pembelajaran',
      'Menggunakan diagram dan grafik dengan penjelasan',
      'Mengikuti presentasi multimedia',
      'Membuat mind map berwarna dengan catatan audio'
    ]
  }
};

const getCompetence = (score) => {
  if (score >= 9) return 'Sangat Sesuai';
  if (score >= 7) return 'Sesuai';
  if (score >= 5) return 'Cukup Sesuai';
  return 'Tidak Sesuai';
};

export default function Results() {
  const [results, setResults] = useState([]);
  const [studentClass, setStudentClass] = useState('');
  const [studentName, setStudentName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('answers') || '{}');
    const cls = localStorage.getItem('studentClass') || '';
    const name = localStorage.getItem('studentName') || '';
    setStudentClass(cls);
    setStudentName(name);

    const res = questions.map((intel, index) => {
      const total = intel.data.reduce((sum, q) => {
        const uniqueKey = `${index + 1}-${q.id}`;
        return sum + (answers[uniqueKey] || 0);
      }, 0);
      const score = total / 5;
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
    localStorage.removeItem('answers');
    localStorage.removeItem('studentClass');
    localStorage.removeItem('studentName');
    window.location.href = '/';
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const getTopCompetencies = () => {
    const competentResults = results.filter(r => parseFloat(r.score) >= 7);
    if (competentResults.length > 0) {
      return competentResults;
    }
    const maxScore = Math.max(...results.map(r => parseFloat(r.score)));
    return results.filter(r => parseFloat(r.score) === maxScore);
  };

  const topCompetencies = getTopCompetencies();
  const uniqueLearningStyles = [...new Set(topCompetencies.map(r => r.recommendation))];

  const learningStyleItems = uniqueLearningStyles.map(style => ({
    key: style,
    label: <Text strong className="text-lg">{style}</Text>,
    children: (
      <div className="space-y-3">
        <Paragraph className="text-gray-700">
          {learningStyleDescriptions[style].description}
        </Paragraph>
        <div>
          <Text strong className="text-blue-900">Tips Belajar:</Text>
          <ul className="mt-2 ml-4 space-y-1">
            {learningStyleDescriptions[style].tips.map((tip, idx) => (
              <li key={idx} className="text-gray-700">{tip}</li>
            ))}
          </ul>
        </div>
        <div className="pt-2">
          <Text strong className="text-blue-900">
            <LinkOutlined className="mr-2" />
            Sumber Belajar:
          </Text>
          <div className="mt-2 text-gray-500 italic">
            To be added yaak
          </div>
        </div>
      </div>
    )
  }));

  const getCompetenceColor = (competence) => {
    switch(competence) {
      case 'Sangat Sesuai': return 'green';
      case 'Sesuai': return 'blue';
      case 'Cukup Sesuai': return 'orange';
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
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>

          <div className="flex gap-4">
            <Button 
              type="default"
              size="large" 
              className="flex-1 border-blue-900 text-blue-900 hover:bg-blue-50 h-12 text-lg font-semibold" 
              onClick={showModal}
              icon={<FileTextOutlined />}
            >
              Lihat Kesimpulan
            </Button>
            <Button 
              type="primary" 
              size="large" 
              className="flex-1 bg-blue-900 hover:bg-blue-800 border-0 h-12 text-lg font-semibold" 
              onClick={handleReset}
            >
              Mulai Lagi
            </Button>
          </div>

          <Modal
            title={
              <Title level={3} className="text-blue-900 mb-0">
                <BulbOutlined className="mr-2" />
                Kesimpulan & Rekomendasi Belajar
              </Title>
            }
            open={isModalOpen}
            onCancel={handleModalClose}
            footer={[
              <Button key="close" type="primary" onClick={handleModalClose} className="bg-blue-900">
                Tutup
              </Button>
            ]}
            width={700}
          >
            <Divider />
            <div className="space-y-4">
              <div>
                <Title level={5} className="text-blue-900">
                  🎯 Kompetensi Unggulan Anda:
                </Title>
                <List
                  dataSource={topCompetencies}
                  renderItem={item => (
                    <List.Item className="border-0 py-2">
                      <div className="w-full">
                        <Text strong className="text-base">{item.name}</Text>
                        <div className="flex items-center gap-2 mt-1">
                          <Text className="text-gray-600">Skor: </Text>
                          <Text strong className="text-lg text-blue-900">{item.score}</Text>
                          <Tag color={getCompetenceColor(item.competence)} className="ml-2">
                            {item.competence}
                          </Tag>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>

              <Divider />

              <div>
                <Title level={5} className="text-blue-900 mb-3">
                  📚 Gaya Belajar yang Cocok untuk Anda:
                </Title>
                <Collapse 
                  items={learningStyleItems}
                  accordion
                  className="bg-blue-50"
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}