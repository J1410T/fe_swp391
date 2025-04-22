# FPTU Admissions Admin Dashboard

## Tổng quan dự án

Admin Dashboard cho FPTU Admissions là một ứng dụng quản lý tập trung cho dữ liệu tuyển sinh của FPT University. Dự án sử dụng các công nghệ hiện đại nhất:

- **React 19**: Tận dụng các tính năng mới nhất như Suspense, Server Components
- **TypeScript**: Đảm bảo type safety và developer experience
- **Vite**: Build tool nhanh và hiệu quả
- **React Router 7**: Routing với Data API mạnh mẽ
- **shadcn/ui**: UI components đẹp và dễ tùy biến
- **Zustand** (tùy chọn): State management nhẹ và linh hoạt

## Mục tiêu dự án

- Cung cấp giao diện quản lý tập trung cho dữ liệu tuyển sinh
- Cho phép cập nhật nhanh thông tin về ngành học, phương thức tuyển sinh, học bổng, ký túc xá, v.v.
- Phân quyền rõ ràng giữa quản trị viên và nhân viên hỗ trợ
- Hỗ trợ giám sát và cải thiện liên tục chất lượng dữ liệu cho AI Agent

## Cấu trúc dự án tối ưu

```
src/
├── api/                  # API utilities và resources
│   ├── base.ts           # API utility cơ bản
│   ├── resources/        # Các resource API
│   │   ├── majors.ts     # API cho majors
│   │   ├── admission-methods.ts
│   │   └── ...
│   └── types.ts          # Các type chung cho API
├── components/           # Components
│   ├── ui/               # shadcn/ui components
│   ├── common/           # Common components
│   │   ├── error-boundary.tsx
│   │   ├── loading.tsx
│   │   └── ...
│   └── domain/           # Domain-specific components
│       ├── majors/
│       ├── admission-methods/
│       └── ...
├── hooks/                # Custom hooks
│   ├── use-resource.ts   # Hook cho Suspense resource
│   └── ...
├── pages/                # Page components
│   ├── majors/
│   │   ├── index.tsx     # Majors page
│   │   ├── create.tsx    # Create major page
│   │   └── [id].tsx      # Edit major page
│   └── ...
├── routes/               # React Router routes
│   ├── index.tsx         # Root route
│   ├── config.tsx        # Route configuration
│   └── resources/        # Resource routes
│       ├── majors/
│       │   ├── index.tsx # Route definition
│       │   ├── loader.ts # Data loader
│       │   └── types.ts  # Type definitions
│       └── ...
└── utils/                # Utilities
    ├── suspense.ts       # Suspense utilities
    └── ...
```
