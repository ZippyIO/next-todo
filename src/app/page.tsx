import CardLayout from '~/components/todo/CardLayout';
import TodoForm from '~/components/todo/TodoForm';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoForm />
      <CardLayout />
    </main>
  );
};

export default HomePage;
