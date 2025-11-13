import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Card, Typography, Input } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import Navbar from './Navbar';
import WaveAnimation from './WaveAnimation';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const classes = [
  'X RPL 1', 'X RPL 2',
  'XI RPL 1', 'XI RPL 2', 'XI RPL 3',
  'XII RPL 1', 'XII RPL 2', 'XII RPL 3'
];

export default function HomePage() {
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedClass && studentName) {
      localStorage.setItem('studentClass', selectedClass);
      localStorage.setItem('studentName', studentName);
      navigate('/questionnaire/1');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-blue-900 relative">
      <WaveAnimation />
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 relative z-10">
        <Card className="w-full max-w-lg shadow-2xl border-0">
          <div className="text-center mb-6">
            <Title level={1} className="text-blue-900 mb-2">Selamat Datang!</Title>
            <Paragraph className="text-gray-600 text-lg">
              Kuesioner Kecerdasan Majemuk SMKN 10 Semarang
            </Paragraph>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <UserOutlined className="mr-2" />Nama Lengkap
              </label>
              <Input
                size="large"
                placeholder="Masukkan nama lengkap Anda"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TeamOutlined className="mr-2" />Kelas
              </label>
              <Select
                size="large"
                placeholder="Pilih kelas Anda"
                value={selectedClass}
                onChange={setSelectedClass}
                className="w-full"
              >
                {classes.map(cls => (
                  <Option key={cls} value={cls}>{cls}</Option>
                ))}
              </Select>
            </div>
          </div>
          
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSubmit}
            disabled={!selectedClass || !studentName}
            className="mt-6 bg-blue-900 hover:bg-blue-800 border-0 h-12 text-lg font-semibold"
          >
            Mulai Kuesioner
          </Button>
        </Card>
      </div>
    </div>
  );
}