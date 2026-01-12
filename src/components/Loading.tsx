type LoadingProps = {
  children?: React.ReactNode;
};

export default function Loading({ children }: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-50/30">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7e22ce] border-t-transparent" />
        <p className="text-gray-500">{children}</p>
      </div>
    </div>
  );
}
