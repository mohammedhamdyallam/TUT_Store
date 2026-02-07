// Zod
import z from "zod";

// Register Schema
export const registerSchema = z.object({
    name: z.string({ required_error: "الاسم مطلوب" }).min(3, "يجب أن يكون الاسم 3 أحرف على الأقل").max(20, "يجب أن لا يزيد الاسم عن 20 حرف"),
    email: z.string({ required_error: "البريد الإلكتروني مطلوب" }).min(3, "البريد الإلكتروني قصير جداً").max(50, "البريد الإلكتروني طويل جداً").email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z.string({ required_error: "كلمة المرور مطلوبة" }).min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
});

// Login Schema
export const loginSchema = z.object({
    email: z.string({ required_error: "البريد الإلكتروني مطلوب" }).min(3, "البريد الإلكتروني قصير جداً").max(50, "البريد الإلكتروني طويل جداً").email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z.string({ required_error: "كلمة المرور مطلوبة" }).min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
});

// Edit user Schema
export const EditUserSchema = z.object({
    name: z.string().min(3, "يجب أن يكون الاسم 3 أحرف على الأقل").max(20, "يجب أن لا يزيد الاسم عن 20 حرف").optional(),
    email: z.string().min(3, "البريد الإلكتروني قصير جداً").max(50, "البريد الإلكتروني طويل جداً").email("صيغة البريد الإلكتروني غير صحيحة").optional(),
    password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل").optional()
});
