// import { createContext } from 'vm';
// import { forwardRef, useRef, useEffect, ReactNode, useContext } from 'react';
// import { cva, type VariantProps } from 'class-variance-authority';
// import { X } from 'lucide-react';
// import { createPortal } from 'react-dom';
// import { cn } from '../../../shared/utils';

// // Базовый контекст для управления состоянием Sheet
// const SheetContext = createContext<{
//   isOpen: boolean;
//   onClose: () => void;
// } | null>(null);

// const useSheetContext = () => {
//   const context = useContext(SheetContext);
//   if (!context) {
//     throw new Error('useSheetContext must be used within a SheetProvider');
//   }
//   return context;
// };

// // Sheet компонент
// const Sheet: React.FC<{ children: ReactNode; isOpen?: boolean; onClose?: () => void }> = ({
//   children,
//   isOpen = false,
//   onClose = () => {},
// }) => {
//   return <SheetContext.Provider value={{ isOpen, onClose }}>{children}</SheetContext.Provider>;
// };

// // Trigger
// const SheetTrigger: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const { onClose } = useSheetContext();
//   return <div onClick={onClose}>{children}</div>;
// };

// // Portal
// const SheetPortal: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const portalRoot = useRef(document.createElement('div'));

//   useEffect(() => {
//     const currentPortal = portalRoot.current;
//     document.body.appendChild(currentPortal);
//     return () => {
//       document.body.removeChild(currentPortal);
//     };
//   }, []);

//   return portalRoot.current ? createPortal(children, portalRoot.current) : null;
// };

// // Overlay
// const SheetOverlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => {
//     return (
//       <div
//         className={cn('fixed inset-0 z-50 bg-black/80', className)}
//         ref={ref}
//         {...props}
//       />
//     );
//   },
// );
// SheetOverlay.displayName = 'SheetOverlay';

// // Variants
// const sheetVariants = cva('fixed z-50 bg-background shadow-lg transition-transform ease-in-out', {
//   variants: {
//     side: {
//       top: 'inset-x-0 top-0 transform data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0',
//       bottom: 'inset-x-0 bottom-0 transform data-[state=closed]:translate-y-full data-[state=open]:translate-y-0',
//       left: 'inset-y-0 left-0 transform data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0',
//       right: 'inset-y-0 right-0 transform data-[state=closed]:translate-x-full data-[state=open]:translate-x-0',
//     },
//   },
//   defaultVariants: {
//     side: 'right',
//   },
// });

// type SheetContentProps = {} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sheetVariants>;

// const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
//   ({ side = 'right', className, children, ...props }, ref) => {
//     const { isOpen, onClose } = useSheetContext();
//     return (
//       <SheetPortal>
//         <SheetOverlay onClick={onClose} />
//         <div
//           className={cn(sheetVariants({ side }), className)}
//           ref={ref}
//           data-state={isOpen ? 'open' : 'closed'}
//           {...props}
//         >
//           {children}
//           <button
//             className="absolute right-4 top-4 text-white"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>
//       </SheetPortal>
//     );
//   },
// );
// SheetContent.displayName = 'SheetContent';

// // Дополнительные элементы
// const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn('border-b p-4', className)}
//     {...props}
//   />
// );
// SheetHeader.displayName = 'SheetHeader';

// const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={cn('border-t p-4', className)}
//     {...props}
//   />
// );
// SheetFooter.displayName = 'SheetFooter';

// // Экспорт
// export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter };
