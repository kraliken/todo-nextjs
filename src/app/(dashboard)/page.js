import PageHeader from "@/components/page/PageHeader";
import TodoTable from "@/components/table/todo/TodoTable";
import { getTodos } from "@/lib/actions/todo.actions";

export default async function Home() {

    const todos = await getTodos()

    return (
        <div className="flex min-h-[calc(100vh-68px)] flex-col gap-4">
            <PageHeader />
            <TodoTable todos={todos} />
        </div>
    );
}
