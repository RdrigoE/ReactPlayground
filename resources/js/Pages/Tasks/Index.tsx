import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import { Checkbox } from '@/Components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Form } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Tasks({ tasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Lets show tasks
                            <table>
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Task</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => {
                                        return (
                                            <tr key={task.id}>
                                                <td>{task.status}</td>

                                                <td>{task.title}</td>
                                                <td>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            Open
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel>
                                                                <DialogDemo
                                                                    task={task}
                                                                />
                                                            </DropdownMenuLabel>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Edit</DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </AuthenticatedLayout>
    );
}

export function DialogDemo({ task }) {
    const { data, setData, patch, errors } = useForm({
        title: task.title,
        status: task.status,
    });

    // State to control dialog visibility
    const [isOpen, setIsOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        patch(route('tasks.update', task.id), {
            onSuccess: () => setIsOpen(false), // Close the dialog on success
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Edit Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div className="items-top flex space-x-2">
                            <Checkbox
                                checked={data.status === 'completed'}
                                onCheckedChange={(e) =>
                                    setData('status', e ? 'completed' : 'pending')
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label>Task status</Label>
                            </div>
                        </div>
                        <Label htmlFor="task" className="text-right">
                            Task
                        </Label>
                        <Input
                            id="task"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <p className="text-red-500">{errors.title}</p>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={submit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

