"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Calendar, FileText, Target, Users, Plus, 
  Clock, TrendingUp, Award, Brain, Settings, Search,
  ChevronRight, Edit, Trash2, Star, Filter, Download,
  MessageCircle, ThumbsUp, Send, Home, CheckCircle2,
  Circle, AlertCircle, Menu, X, BarChart3, Sparkles,
  GraduationCap, ClipboardList, Lightbulb, Heart, Crown,
  Zap, Shield, Infinity
} from 'lucide-react';

// Tipos de dados
interface Professor {
  name: string;
  subject: string;
  school: string;
  plan?: 'free' | 'professional';
}

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: string;
  objectives: string[];
  status: 'draft' | 'completed' | 'in-use';
  createdAt: string;
}

interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'exam' | 'project';
  subject: string;
  grade: string;
  questions: number;
  createdAt: string;
}

interface CustomContent {
  id: string;
  title: string;
  type: 'material' | 'activity' | 'resource';
  subject: string;
  description: string;
  adaptedFor: string[];
  createdAt: string;
}

interface StudentFeedback {
  id: string;
  lessonId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function PlanejaEdu() {
  // Estados principais
  const [currentView, setCurrentView] = useState('onboarding');
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [customContents, setCustomContents] = useState<CustomContent[]>([]);
  const [feedbacks, setFeedbacks] = useState<StudentFeedback[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewPlanModal, setShowNewPlanModal] = useState(false);
  const [showNewAssessmentModal, setShowNewAssessmentModal] = useState(false);
  const [showNewContentModal, setShowNewContentModal] = useState(false);

  // Dados iniciais após onboarding
  React.useEffect(() => {
    if (professor) {
      setLessonPlans([
        {
          id: '1',
          title: 'Introdução à Fotossíntese',
          subject: 'Ciências',
          grade: '7º Ano',
          duration: '50 min',
          objectives: ['Compreender o processo', 'Identificar componentes'],
          status: 'completed',
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'Equações do 1º Grau',
          subject: 'Matemática',
          grade: '8º Ano',
          duration: '45 min',
          objectives: ['Resolver equações', 'Aplicar em problemas'],
          status: 'in-use',
          createdAt: '2024-01-12'
        },
        {
          id: '3',
          title: 'Verbos no Presente',
          subject: 'Português',
          grade: '6º Ano',
          duration: '40 min',
          objectives: ['Conjugar verbos', 'Identificar tempos verbais'],
          status: 'draft',
          createdAt: '2024-01-15'
        }
      ]);

      setAssessments([
        {
          id: '1',
          title: 'Avaliação de Fotossíntese',
          type: 'quiz',
          subject: 'Ciências',
          grade: '7º Ano',
          questions: 10,
          createdAt: '2024-01-11'
        },
        {
          id: '2',
          title: 'Prova de Matemática',
          type: 'exam',
          subject: 'Matemática',
          grade: '8º Ano',
          questions: 15,
          createdAt: '2024-01-13'
        }
      ]);

      setCustomContents([
        {
          id: '1',
          title: 'Atividade Prática de Fotossíntese',
          type: 'activity',
          subject: 'Ciências',
          description: 'Experimento com plantas',
          adaptedFor: ['Visual', 'Cinestésico'],
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'Vídeo Educativo - Equações',
          type: 'material',
          subject: 'Matemática',
          description: 'Material audiovisual explicativo',
          adaptedFor: ['Visual', 'Auditivo'],
          createdAt: '2024-01-12'
        }
      ]);

      setFeedbacks([
        {
          id: '1',
          lessonId: '1',
          studentName: 'Maria Silva',
          rating: 5,
          comment: 'Aula muito clara e interessante!',
          date: '2024-01-11'
        },
        {
          id: '2',
          lessonId: '2',
          studentName: 'João Santos',
          rating: 4,
          comment: 'Gostei bastante, mas poderia ter mais exemplos.',
          date: '2024-01-13'
        },
        {
          id: '3',
          lessonId: '1',
          studentName: 'Ana Costa',
          rating: 5,
          comment: 'Excelente! Aprendi muito.',
          date: '2024-01-14'
        }
      ]);
    }
  }, [professor]);

  // Funções para criar novos itens
  const handleCreateLessonPlan = (data: any) => {
    const newPlan: LessonPlan = {
      id: String(lessonPlans.length + 1),
      title: data.title,
      subject: data.subject,
      grade: data.grade,
      duration: data.duration,
      objectives: data.objectives.split(',').map((o: string) => o.trim()),
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLessonPlans([...lessonPlans, newPlan]);
    setShowNewPlanModal(false);
  };

  const handleCreateAssessment = (data: any) => {
    const newAssessment: Assessment = {
      id: String(assessments.length + 1),
      title: data.title,
      type: data.type,
      subject: data.subject,
      grade: data.grade,
      questions: parseInt(data.questions),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAssessments([...assessments, newAssessment]);
    setShowNewAssessmentModal(false);
  };

  const handleCreateContent = (data: any) => {
    const newContent: CustomContent = {
      id: String(customContents.length + 1),
      title: data.title,
      type: data.type,
      subject: data.subject,
      description: data.description,
      adaptedFor: data.adaptedFor.split(',').map((a: string) => a.trim()),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomContents([...customContents, newContent]);
    setShowNewContentModal(false);
  };

  // Componente de Onboarding
  const OnboardingView = () => {
    const [formData, setFormData] = useState({
      name: '',
      subject: '',
      school: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.name && formData.subject && formData.school) {
        setProfessor({ ...formData, plan: 'free' });
        setCurrentView('dashboard');
      }
    };

    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">PlanejaEdu</h1>
            <p className="text-gray-400">Planeje aulas incríveis em menos tempo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Qual é o seu nome?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Disciplina principal
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Ex: Matemática, Português, etc."
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Escola/Instituição
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Nome da escola"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Começar a planejar
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Header Mobile
  const MobileHeader = () => (
    <div className="md:hidden bg-[#1A1A1A] border-b border-gray-800 p-4 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-white hover:text-[#00E5FF] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-white font-bold">PlanejaEdu</h1>
      </div>
      
      <div className="w-6" />
    </div>
  );

  // Navegação
  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'lesson-plans', icon: BookOpen, label: 'Planejamentos' },
      { id: 'assessments', icon: ClipboardList, label: 'Avaliações' },
      { id: 'custom-content', icon: Sparkles, label: 'Conteúdos' },
      { id: 'feedback', icon: MessageCircle, label: 'Feedbacks' },
      { id: 'subscription', icon: Crown, label: 'Assinatura' },
      { id: 'profile', icon: Settings, label: 'Perfil' }
    ];

    const handleNavClick = (viewId: string) => {
      setCurrentView(viewId);
      setIsSidebarOpen(false);
    };

    return (
      <>
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <nav className={`
          fixed md:static top-0 left-0 z-50 
          bg-[#1A1A1A] border-r border-gray-800 
          w-64 h-full p-4
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">PlanejaEdu</h1>
                <p className="text-gray-400 text-sm">Prof. {professor?.name?.split(' ')[0]}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-[#00E5FF] text-[#0D0D0D] shadow-lg shadow-[#00E5FF]/20'
                    : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </>
    );
  };

  // Modal genérico
  const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#1A1A1A] border-b border-gray-800 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Modal Novo Plano
  const NewPlanModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      subject: '',
      grade: '',
      duration: '',
      objectives: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateLessonPlan(formData);
    };

    return (
      <Modal isOpen={showNewPlanModal} onClose={() => setShowNewPlanModal(false)} title="Novo Plano de Aula">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Título da Aula</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: Introdução à Fotossíntese"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Disciplina</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Ex: Ciências"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Série</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Ex: 7º Ano"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Duração</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: 50 min"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Objetivos (separados por vírgula)</label>
            <textarea
              value={formData.objectives}
              onChange={(e) => setFormData({...formData, objectives: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors resize-none"
              placeholder="Ex: Compreender o processo, Identificar componentes"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Criar Plano de Aula
          </button>
        </form>
      </Modal>
    );
  };

  // Modal Nova Avaliação
  const NewAssessmentModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      type: 'quiz',
      subject: '',
      grade: '',
      questions: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateAssessment(formData);
    };

    return (
      <Modal isOpen={showNewAssessmentModal} onClose={() => setShowNewAssessmentModal(false)} title="Nova Avaliação">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Título da Avaliação</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: Avaliação de Fotossíntese"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white focus:border-[#00E5FF] focus:outline-none transition-colors"
            >
              <option value="quiz">Quiz</option>
              <option value="exam">Prova</option>
              <option value="project">Projeto</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Disciplina</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Ex: Ciências"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Série</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                placeholder="Ex: 7º Ano"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Número de Questões</label>
            <input
              type="number"
              value={formData.questions}
              onChange={(e) => setFormData({...formData, questions: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: 10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Criar Avaliação
          </button>
        </form>
      </Modal>
    );
  };

  // Modal Novo Conteúdo
  const NewContentModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      type: 'material',
      subject: '',
      description: '',
      adaptedFor: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateContent(formData);
    };

    return (
      <Modal isOpen={showNewContentModal} onClose={() => setShowNewContentModal(false)} title="Novo Conteúdo">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Título do Conteúdo</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: Atividade Prática de Fotossíntese"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white focus:border-[#00E5FF] focus:outline-none transition-colors"
            >
              <option value="material">Material</option>
              <option value="activity">Atividade</option>
              <option value="resource">Recurso</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Disciplina</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: Ciências"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors resize-none"
              placeholder="Descreva o conteúdo..."
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Adaptado para (separados por vírgula)</label>
            <input
              type="text"
              value={formData.adaptedFor}
              onChange={(e) => setFormData({...formData, adaptedFor: e.target.value})}
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
              placeholder="Ex: Visual, Auditivo, Cinestésico"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Criar Conteúdo
          </button>
        </form>
      </Modal>
    );
  };

  // Dashboard View
  const DashboardView = () => {
    const totalPlans = lessonPlans.length;
    const activePlans = lessonPlans.filter(p => p.status === 'in-use').length;
    const totalAssessments = assessments.length;
    const avgRating = feedbacks.length > 0 
      ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length 
      : 0;

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Visão geral do seu planejamento</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <button
            onClick={() => setCurrentView('lesson-plans')}
            className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <span className="text-2xl font-bold text-white">{totalPlans}</span>
            </div>
            <h3 className="text-white font-medium">Planos de Aula</h3>
            <p className="text-gray-400 text-sm">Total criados</p>
          </button>

          <button
            onClick={() => setCurrentView('lesson-plans')}
            className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="text-2xl font-bold text-white">{activePlans}</span>
            </div>
            <h3 className="text-white font-medium">Em Uso</h3>
            <p className="text-gray-400 text-sm">Aulas ativas</p>
          </button>

          <button
            onClick={() => setCurrentView('assessments')}
            className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-purple-500" />
              </div>
              <span className="text-2xl font-bold text-white">{totalAssessments}</span>
            </div>
            <h3 className="text-white font-medium">Avaliações</h3>
            <p className="text-gray-400 text-sm">Criadas</p>
          </button>

          <button
            onClick={() => setCurrentView('feedback')}
            className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</span>
            </div>
            <h3 className="text-white font-medium">Avaliação Média</h3>
            <p className="text-gray-400 text-sm">Feedback alunos</p>
          </button>
        </div>

        {/* Planos recentes e Sugestões */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Planos Recentes</h2>
              <button 
                onClick={() => setCurrentView('lesson-plans')}
                className="text-[#00E5FF] hover:text-[#00A8CC] transition-colors text-sm"
              >
                Ver todos
              </button>
            </div>
            <div className="space-y-3">
              {lessonPlans.slice(0, 3).map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setCurrentView('lesson-plans')}
                  className="w-full flex items-center gap-3 p-3 bg-[#0D0D0D] rounded-xl hover:bg-[#2A2A2A] transition-colors text-left"
                >
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    plan.status === 'completed' ? 'bg-emerald-500' :
                    plan.status === 'in-use' ? 'bg-[#00E5FF]' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{plan.title}</h3>
                    <p className="text-gray-400 text-xs">{plan.subject} • {plan.grade}</p>
                  </div>
                  <span className="text-gray-400 text-xs whitespace-nowrap">
                    {plan.duration}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-6 h-6 text-[#00E5FF]" />
              <h2 className="text-xl font-bold text-white">Sugestões</h2>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-xl">
                <h4 className="text-[#00E5FF] font-medium mb-2">Material Recomendado</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Vídeo educativo sobre Fotossíntese para complementar sua aula
                </p>
                <button className="text-[#00E5FF] text-sm hover:underline">
                  Ver recurso →
                </button>
              </div>
              
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                <h4 className="text-purple-400 font-medium mb-2">Atividade Adaptada</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Exercícios práticos adequados para diferentes estilos de aprendizado
                </p>
                <button className="text-purple-400 text-sm hover:underline">
                  Explorar →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Lesson Plans View
  const LessonPlansView = () => {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Planejamentos de Aulas</h1>
            <p className="text-gray-400">Crie e gerencie seus planos de aula</p>
          </div>
          <button 
            onClick={() => setShowNewPlanModal(true)}
            className="bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Plano
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonPlans.map((plan) => (
            <div key={plan.id} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.status === 'completed' ? 'bg-emerald-500/10' :
                  plan.status === 'in-use' ? 'bg-[#00E5FF]/10' : 'bg-gray-700/10'
                }`}>
                  <BookOpen className={`w-6 h-6 ${
                    plan.status === 'completed' ? 'text-emerald-500' :
                    plan.status === 'in-use' ? 'text-[#00E5FF]' : 'text-gray-500'
                  }`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                  plan.status === 'in-use' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' :
                  'bg-gray-700/20 text-gray-400'
                }`}>
                  {plan.status === 'completed' ? 'Concluído' :
                   plan.status === 'in-use' ? 'Em Uso' : 'Rascunho'}
                </span>
              </div>
              
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#00E5FF] transition-colors">
                {plan.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{plan.subject} • {plan.grade}</p>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>{plan.duration}</span>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-xs mb-2">Objetivos:</p>
                <ul className="space-y-1">
                  {plan.objectives.slice(0, 2).map((obj, idx) => (
                    <li key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                <button className="flex-1 text-gray-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="flex-1 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Assessments View
  const AssessmentsView = () => {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Criação de Avaliações</h1>
            <p className="text-gray-400">Crie provas, quizzes e projetos</p>
          </div>
          <button 
            onClick={() => setShowNewAssessmentModal(true)}
            className="bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Avaliação
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  assessment.type === 'quiz' ? 'bg-purple-500/10' :
                  assessment.type === 'exam' ? 'bg-red-500/10' : 'bg-blue-500/10'
                }`}>
                  <ClipboardList className={`w-6 h-6 ${
                    assessment.type === 'quiz' ? 'text-purple-500' :
                    assessment.type === 'exam' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assessment.type === 'quiz' ? 'bg-purple-500/20 text-purple-400' :
                  assessment.type === 'exam' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {assessment.type === 'quiz' ? 'Quiz' :
                   assessment.type === 'exam' ? 'Prova' : 'Projeto'}
                </span>
              </div>
              
              <h3 className="text-white font-semibold mb-2">{assessment.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{assessment.subject} • {assessment.grade}</p>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <FileText className="w-4 h-4" />
                <span>{assessment.questions} questões</span>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                <button className="flex-1 text-gray-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="flex-1 text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4 inline mr-1" />
                  Exportar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom Content View
  const CustomContentView = () => {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Conteúdos Personalizados</h1>
            <p className="text-gray-400">Materiais adaptados para cada aluno</p>
          </div>
          <button 
            onClick={() => setShowNewContentModal(true)}
            className="bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Criar Conteúdo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customContents.map((content) => (
            <div key={content.id} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  content.type === 'material' ? 'bg-[#00E5FF]/10' :
                  content.type === 'activity' ? 'bg-emerald-500/10' : 'bg-yellow-500/10'
                }`}>
                  <Sparkles className={`w-6 h-6 ${
                    content.type === 'material' ? 'text-[#00E5FF]' :
                    content.type === 'activity' ? 'text-emerald-500' : 'text-yellow-500'
                  }`} />
                </div>
                <Star className="w-5 h-5 text-gray-500 hover:text-yellow-500 transition-colors cursor-pointer" />
              </div>
              
              <h3 className="text-white font-semibold mb-2">{content.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{content.description}</p>
              
              <div className="mb-4">
                <p className="text-gray-500 text-xs mb-2">Adaptado para:</p>
                <div className="flex flex-wrap gap-2">
                  {content.adaptedFor.map((style, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg text-xs">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                <button className="flex-1 text-gray-400 hover:text-[#00E5FF] transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="flex-1 text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4 inline mr-1" />
                  Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Feedback View
  const FeedbackView = () => {
    const avgRating = feedbacks.length > 0 
      ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length 
      : 0;

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Feedbacks dos Alunos</h1>
          <p className="text-gray-400">Avaliações e comentários sobre suas aulas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-white mb-2">{avgRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= avgRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                ))}
              </div>
              <p className="text-gray-400 text-sm">{feedbacks.length} avaliações</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-2xl font-bold text-white">95%</span>
            </div>
            <p className="text-white font-medium">Satisfação</p>
            <p className="text-gray-400 text-sm">Alunos satisfeitos</p>
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <span className="text-2xl font-bold text-white">+12%</span>
            </div>
            <p className="text-white font-medium">Melhoria</p>
            <p className="text-gray-400 text-sm">vs. mês anterior</p>
          </div>
        </div>

        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {feedback.studentName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{feedback.studentName}</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-2">{feedback.comment}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{new Date(feedback.date).toLocaleDateString('pt-BR')}</span>
                    <button className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Útil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Subscription View
  const SubscriptionView = () => {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Planos de Assinatura</h1>
          <p className="text-gray-400">Escolha o plano ideal para você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Plano Gratuito */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Gratuito</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-white">R$ 0</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <p className="text-gray-400 text-sm">Perfeito para começar</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Até 5 planos de aula por mês</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">3 avaliações por mês</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Conteúdos básicos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Suporte por email</span>
              </li>
            </ul>

            <button 
              disabled
              className="w-full bg-gray-800 text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed"
            >
              Plano Atual
            </button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-gradient-to-br from-[#00E5FF]/10 to-[#00A8CC]/10 border-2 border-[#00E5FF] rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                RECOMENDADO
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                Profissional
                <Sparkles className="w-6 h-6 text-[#00E5FF]" />
              </h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-white">R$ 97</span>
                <span className="text-gray-400">/mês</span>
              </div>
              <div className="text-[#00E5FF] text-sm mb-4">
                ou R$ 500/ano (economize R$ 664)
              </div>
              <p className="text-gray-400 text-sm">Para professores dedicados</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Planos de aula ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Avaliações ilimitadas</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Conteúdos personalizados ilimitados</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Geração com IA avançada</span>
              </li>
              <li className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Sugestões inteligentes personalizadas</span>
              </li>
              <li className="flex items-start gap-3">
                <Target className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Análise de desempenho dos alunos</span>
              </li>
              <li className="flex items-start gap-3">
                <Download className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Exportação em múltiplos formatos</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Backup automático na nuvem</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Colaboração com outros professores</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm font-medium">Suporte prioritário 24/7</span>
              </li>
            </ul>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" />
                Assinar Mensal - R$ 97
              </button>
              <button className="w-full bg-white/10 border border-[#00E5FF] text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Infinity className="w-5 h-5" />
                Assinar Anual - R$ 500
              </button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-4">
              Cancele quando quiser • Garantia de 7 dias
            </p>
          </div>
        </div>

        {/* Benefícios adicionais */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Por que escolher o Plano Profissional?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h3 className="text-white font-semibold mb-2">Economize Tempo</h3>
              <p className="text-gray-400 text-sm">
                Reduza em até 70% o tempo gasto no planejamento de aulas com IA avançada
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-white font-semibold mb-2">Melhore Resultados</h3>
              <p className="text-gray-400 text-sm">
                Aulas mais eficientes e personalizadas aumentam o engajamento dos alunos
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-white font-semibold mb-2">Foco no que Importa</h3>
              <p className="text-gray-400 text-sm">
                Menos burocracia, mais tempo para se conectar com seus alunos
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile View
  const ProfileView = () => {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Perfil do Professor</h1>
          <p className="text-gray-400">Gerencie suas informações</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Informações Pessoais</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={professor?.name || ''}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Disciplina</label>
                  <input
                    type="text"
                    value={professor?.subject || ''}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Escola</label>
                  <input
                    type="text"
                    value={professor?.school || ''}
                    className="w-full px-4 py-3 bg-[#0D0D0D] border border-gray-800 rounded-xl text-white focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#00E5FF] to-[#00A8CC] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {professor?.name?.split(' ').map(n => n[0]).join('') || 'P'}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{professor?.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{professor?.subject}</p>
              <button className="bg-[#0D0D0D] border border-gray-800 text-white px-4 py-2 rounded-xl font-medium hover:bg-[#2A2A2A] transition-colors text-sm">
                Alterar Foto
              </button>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Planos criados</span>
                  <span className="text-white font-bold">{lessonPlans.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Avaliações</span>
                  <span className="text-white font-bold">{assessments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Conteúdos</span>
                  <span className="text-white font-bold">{customContents.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal
  if (!professor) {
    return <OnboardingView />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col md:flex-row font-inter">
      <MobileHeader />
      <Navigation />
      
      <main className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'lesson-plans' && <LessonPlansView />}
        {currentView === 'assessments' && <AssessmentsView />}
        {currentView === 'custom-content' && <CustomContentView />}
        {currentView === 'feedback' && <FeedbackView />}
        {currentView === 'subscription' && <SubscriptionView />}
        {currentView === 'profile' && <ProfileView />}
      </main>

      {/* Modais */}
      <NewPlanModal />
      <NewAssessmentModal />
      <NewContentModal />
    </div>
  );
}
