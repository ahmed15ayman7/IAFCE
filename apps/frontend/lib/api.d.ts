export interface Profile {
    id: string;
    name: string;
    nickname?: string;
    email: string;
    phone?: string;
    age?: number;
    grade?: string;
    avatar?: string;
    academicId: string;
    verified: boolean;
    active: boolean;
    twoFactor?: {
        email: boolean;
        sms: boolean;
        authenticator: boolean;
    };
    loginHistory?: {
        ip: string;
        date: string;
        success: boolean;
    }[];
}

export interface ProfileApi {
    getProfile: () => Promise<Profile>;
    updateProfile: (data: Partial<Profile>) => Promise<Profile>;
    changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
    update2FA: (data: Partial<Profile['twoFactor']>) => Promise<void>;
}

export const profileApi: ProfileApi; 