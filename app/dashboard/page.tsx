'use client';

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [meals, setMeals] = useState<any[]>([]);
  const [plannedMeals, setPlannedMeals] = useState<any[]>([]);

  const [form, setForm] = useState({
    _id: null,
    name: '',
    description: '',
    calories: '',
    dateTime: '',
    type: '',
  });

  const [plannedForm, setPlannedForm] = useState({
    name: '',
    type: '',
    dateTime: '',
    calories: '',
  });

  const [viewMode, setViewMode] = useState<'form' | 'summary' | 'planning'>('form');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc' as 'asc' | 'desc',
  });

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!userId) return;

    setForm((prev) => ({
      ...prev,
      dateTime: getCurrentDateTimeLocal()
    }));

    setPlannedForm((prev) => ({
      ...prev,
      dateTime: getCurrentDateTimeLocal()
    }));

    fetch('/api/meals')
      .then((res) => res.json())
      .then((data) => {
        const userMeals = data.filter((meal: any) => meal.userId === userId);
        setMeals(userMeals);

        const total = userMeals.reduce((acc: number, meal: any) => acc + (meal.calories || 0), 0);
        setTotalCalories(total);
      });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("Usuário não logado");

    const isEditing = !!form._id;
    const url = isEditing ? `/api/meals/${form._id}` : '/api/meals';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        calories: Number(form.calories),
        dateTime: new Date(form.dateTime),
        userId,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Erro ao salvar:", error);
      return;
    }

    const newMeal = await res.json();

    if (isEditing) {
      setMeals(meals.map((m) => (m._id === newMeal._id ? newMeal : m)));
    } else {
      setMeals([newMeal, ...meals]);
      setTotalCalories(prev => prev + newMeal.calories);
    }

    setForm({
      _id: null,
      name: '',
      description: '',
      calories: '',
      dateTime: getCurrentDateTimeLocal(),
      type: '',
    });
  };

  const handlePlanningSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlannedMeal = {
      ...plannedForm,
      calories: Number(plannedForm.calories),
    };

    setPlannedMeals(prev => [...prev, newPlannedMeal]);

    setPlannedForm({
      name: '',
      type: '',
      dateTime: getCurrentDateTimeLocal(),
      calories: '',
    });
  };

  const handleEdit = async (mealId: string) => {
    const mealToEdit = meals.find(meal => meal._id === mealId);
    if (!mealToEdit) return;

    setForm({
      _id: mealToEdit._id,
      name: mealToEdit.name,
      description: mealToEdit.description,
      calories: mealToEdit.calories.toString(),
      dateTime: new Date(mealToEdit.dateTime).toISOString().slice(0, 16),
      type: mealToEdit.type,
    });

    setViewMode('form');
  };

  const handleDelete = async (mealId: string) => {
    if (!window.confirm('Você tem certeza que deseja excluir esta refeição?')) return;
  
    try {
      // Envia a requisição DELETE para a API
      const res = await fetch(`/api/meals/${mealId}`, {
        method: 'DELETE',
      });
  
      // Verifica se a resposta da API foi bem-sucedida
      if (!res.ok) {
        const error = await res.text();
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir a refeição. Tente novamente mais tarde.");
        return;
      }
  
      // Atualiza as calorias e remove a refeição do estado 'meals'
      const mealToDelete = meals.find(meal => meal._id === mealId);
      if (mealToDelete) {
        setTotalCalories(prev => prev - (mealToDelete.calories || 0));
      }
  
      // Remove a refeição da lista de refeições
      setMeals(meals.filter(meal => meal._id !== mealId));
  
      // Caso tenha sucesso, você pode opcionalmente exibir uma mensagem de sucesso
      alert("Refeição excluída com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir refeição:", error);
      alert("Houve um erro ao excluir a refeição. Tente novamente mais tarde.");
    }
  };
  
  const handlePlannedDelete = (index: number) => {
    // Atualiza o estado das refeições planejadas removendo a refeição no índice
    setPlannedMeals(prev => prev.filter((_, i) => i !== index));
  };

  const filteredMeals = meals.filter((meal) => {
    const matchesType = filterType ? meal.type === filterType : true;
    const matchesDate = filterDate
      ? new Date(meal.dateTime).toISOString().split('T')[0] === filterDate
      : true;
    return matchesType && matchesDate;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedMeals = [...filteredMeals].sort((a, b) => {
      if (key === 'calories') {
        return direction === 'asc' ? a.calories - b.calories : b.calories - a.calories;
      } else if (key === 'dateTime') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        const valA = a[key].toString().toLowerCase();
        const valB = b[key].toString().toLowerCase();
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setMeals(sortedMeals);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#A2BF63] to-[#D9BD8B]">
      <div className="w-full h-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white p-8 rounded-lg shadow-2xl flex flex-col justify-center space-y-8">
        <h1 className="text-3xl font-extrabold text-[#36593F] text-center">
          Bem-Vindo(a) Ao Alimemento
        </h1>

        <p className="text-lg text-[#36593F] text-center">
          {viewMode === 'form'
            ? 'Registre abaixo os alimentos que você consumiu e acompanhe sua alimentação de forma prática!'
            : viewMode === 'planning'
            ? 'Aqui você pode planejar suas refeições para o dia.'
            : 'Aqui você pode visualizar e acompanhar todos os alimentos registrados. Clique nas colunas para organizar por Nome, Calorias ou Data.'}
        </p>

        {viewMode === 'form' ? (
          // FORMULÁRIO DE REGISTRO DE REFEIÇÕES
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#36593F] font-semibold mb-1">Nome do Alimento</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                required
              />
            </div>
            <div>
              <label className="block text-[#36593F] font-semibold mb-1">Descrição</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
              />
            </div>
            <div>
              <label className="block text-[#36593F] font-semibold mb-1">Calorias</label>
              <input
                type="number"
                value={form.calories}
                onChange={(e) => setForm({ ...form, calories: e.target.value })}
                className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                required
              />
            </div>
            <div>
              <label className="block text-[#36593F] font-semibold mb-1">Data e Hora</label>
              <input
                type="datetime-local"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#36593F] font-semibold mb-1">Tipo de Refeição</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                required
              >
                <option value="">Selecione o Tipo</option>
                <option value="Café da manhã">Café da manhã</option>
                <option value="Almoço">Almoço</option>
                <option value="Lanche">Lanche</option>
                <option value="Jantar">Jantar</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#A2BF63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36593F]"
              >
                {form._id ? 'Atualizar Refeição' : 'Registrar Alimento'}
              </button>
            </div>
          </form>
        ) : viewMode === 'planning' ? (
          // PLANEJAMENTO
          <div>
            <form onSubmit={handlePlanningSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[#36593F] font-semibold mb-1">Nome do Alimento</label>
                <input
                  type="text"
                  value={plannedForm.name}
                  onChange={(e) => setPlannedForm({ ...plannedForm, name: e.target.value })}
                  className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#36593F] font-semibold mb-1">Tipo de Refeição</label>
                <select
                  value={plannedForm.type}
                  onChange={(e) => setPlannedForm({ ...plannedForm, type: e.target.value })}
                  className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Café da manhã">Café da manhã</option>
                  <option value="Almoço">Almoço</option>
                  <option value="Lanche">Lanche</option>
                  <option value="Jantar">Jantar</option>
                </select>
              </div>
              <div>
                <label className="block text-[#36593F] font-semibold mb-1">Data</label>
                <input
                  type="datetime-local"
                  value={plannedForm.dateTime}
                  onChange={(e) => setPlannedForm({ ...plannedForm, dateTime: e.target.value })}
                  className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#36593F] font-semibold mb-1">Calorias Estimadas</label>
                <input
                  type="number"
                  value={plannedForm.calories}
                  onChange={(e) => setPlannedForm({ ...plannedForm, calories: e.target.value })}
                  className="w-full border-2 border-[#36593F] px-4 py-3 rounded-lg text-[#36593F]"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#A2BF63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36593F]"
                >
                  Adicionar ao Planejamento
                </button>
              </div>
            </form>

            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#A2BF63] text-white">
                  <th className="px-4 py-2">Refeição</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Calorias</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {plannedMeals.length > 0 ? (
                  plannedMeals.map((meal, index) => (
                    <tr key={index} className="border-t text-[#36593F]">
                      <td className="px-4 py-2">{meal.name}</td>
                      <td className="px-4 py-2">{meal.type}</td>
                      <td className="px-4 py-2">{new Date(meal.dateTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{meal.calories} kcal</td>
                      <td className="px-4 py-2">
                        <button onClick={() => handlePlannedDelete(index)} className="text-red-500 hover:text-red-700">Excluir</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center px-4 py-2">Nenhuma refeição planejada ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // HISTÓRICO DE REFEIÇÕES
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-[#A2BF63] text-white">
                    <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Nome</th>
                    <th className="px-4 py-2">Descrição</th>
                    <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('calories')}>Calorias</th>
                    <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('dateTime')}>Data</th>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMeals.map((meal) => (
                    <tr key={meal._id} className="border-t text-[#36593F]">
                      <td className="px-4 py-2">{meal.name}</td>
                      <td className="px-4 py-2">{meal.description}</td>
                      <td className="px-4 py-2">{meal.calories} kcal</td>
                      <td className="px-4 py-2">{new Date(meal.dateTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{meal.type}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button onClick={() => handleEdit(meal._id)} className="text-blue-500 hover:text-blue-700">Editar</button>
                        <button onClick={() => handleDelete(meal._id)} className="text-red-500 hover:text-red-700">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4 font-bold text-[#36593F]">
              Total de Calorias: {totalCalories} kcal
            </div>
          </>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={() => setViewMode('form')} className="bg-[#A2BF63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36593F]">Registrar Alimento</button>
          <button onClick={() => setViewMode('summary')} className="bg-[#A2BF63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36593F]">Histórico</button>
          <button onClick={() => setViewMode('planning')} className="bg-[#A2BF63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36593F]">Planejamento</button>
        </div>
      </div>
    </main>
  );
}
