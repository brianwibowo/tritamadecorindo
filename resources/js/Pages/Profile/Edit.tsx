import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                    Pengaturan Profil & Keamanan
                </h2>
            }
        >
            <Head title="Pengaturan Profil — Panel Admin Tritama Decorindo" />

            <div className="space-y-6">
                <div className="bg-white p-6 shadow-sm rounded-3xl border border-border/60 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-6 shadow-sm rounded-3xl border border-border/60 sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-white p-6 shadow-sm rounded-3xl border border-border/60 sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
