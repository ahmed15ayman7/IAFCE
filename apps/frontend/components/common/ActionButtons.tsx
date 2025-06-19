"use client";

import { PencilIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface ActionButtonsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    onExport?: () => void;
    showEdit?: boolean;
    showDelete?: boolean;
    showView?: boolean;
    showExport?: boolean;
}

export default function ActionButtons({
    onEdit,
    onDelete,
    onView,
    onExport,
    showEdit = true,
    showDelete = true,
    showView = true,
    showExport = true,
}: ActionButtonsProps) {
    return (
        <div className="flex items-center gap-2">
            {showView && (
                <button
                    onClick={onView}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="عرض"
                >
                    <EyeIcon className="w-5 h-5" />
                </button>
            )}
            {showEdit && (
                <button
                    onClick={onEdit}
                    className="p-1 text-yellow-600 hover:bg-yellow-50 rounded-full"
                    title="تعديل"
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
            )}
            {showDelete && (
                <button
                    onClick={onDelete}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    title="حذف"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            )}
            {showExport && (
                <button
                    onClick={onExport}
                    className="p-1 text-green-600 hover:bg-green-50 rounded-full"
                    title="تصدير"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
            )}
        </div>
    );
} 