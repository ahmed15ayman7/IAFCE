# منصة أكاديمية تكنولوجية شاملة

منصة تعليمية ذكية متكاملة تقدم تجربة تعليمية حديثة ومتطورة للطلاب والمعلمين وأولياء الأمور.

## المميزات الرئيسية

- نظام تعليمي متكامل يدعم التعلم عن بعد والتعلم المدمج
- واجهة مستخدم حديثة وسهلة الاستخدام
- دعم كامل للغة العربية والاتجاه RTL
- نظام إدارة محتوى متقدم
- تقييم وتتبع تقدم الطلاب
- نظام إشعارات ذكي
- دعم التعلم الاجتماعي والمجتمعات التعليمية
- تكامل مع أدوات التعلم عن بعد
- تحليلات وتقارير متقدمة

## هيكل المشروع

```
.
├── apps/
│   ├── backend/         # NestJS Backend
│   ├── frontend/        # Next.js Frontend
│   └── admin/           # Next.js Admin Panel
├── packages/
│   └── shared/          # Shared Code & Prisma Schema
└── package.json
```

## المتطلبات

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

## التثبيت

1. تثبيت التبعيات:
```bash
pnpm install
```

2. إعداد قاعدة البيانات:
```bash
cd packages/shared
pnpm prisma generate
pnpm prisma db push
```

3. تشغيل التطبيقات:
```bash
# Backend
cd apps/backend
pnpm start:dev

# Frontend
cd apps/frontend
pnpm dev

# Admin Panel
cd apps/admin
pnpm dev
```

## المساهمة

نرحب بمساهماتكم في تطوير المنصة. يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل. 