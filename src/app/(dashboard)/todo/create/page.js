import NewTodoForm from "@/components/form/NewTodo";
import PageHeader from "@/components/page/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function TodoCreatePage() {
    return (
        <div className="flex min-h-[calc(100vh-68px)] flex-col gap-4">
            <PageHeader title="Feladat létrehozás" />
            <Card className="">
                <CardContent className="">
                    <NewTodoForm />
                </CardContent>
            </Card>
        </div>
    );
}