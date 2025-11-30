import { Button } from "@/components/ui/button";

export function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center py-8 text-gray-900 dark:text-white">
          Instagram Feed Challenge
        </h1>

        <Button
          onClick={() => {
            console.log("Button clicked!");
          }}
        >
          Clique aqui
        </Button>
      </div>
    </div>
  );
}
