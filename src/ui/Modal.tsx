import {
  HTMLAttributes,
  PropsWithChildren,
  PropsWithoutRef,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

type ContextValue = {
  open: (prop: string) => void;
  close: () => void;
  openName: string;
};

type OpenChildrenProps<T> = {
  children: T;
  openNameWindow: string;
} & PropsWithoutRef<T>;

const ModalContext = createContext<ContextValue>({
  open() {},
  close() {},
  openName: '',
});

export default function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState<string>('');

  const open = setOpenName;

  const close = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open<T extends HTMLAttributes<HTMLElement>>({
  children,
  openNameWindow,
}: OpenChildrenProps<T>) {
  const { open } = useContext(ModalContext);

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => open(openNameWindow),
  });
}

function Window({
  children,
  windowName,
}: PropsWithChildren & { windowName: string }) {
  const { close, openName } = useContext(ModalContext);
  const [isClosing, setIsClosing] = useState<boolean>(true);

  useEffect(() => {
    if (windowName === openName) {
      setIsClosing(false);
    }

    let timer: number;

    if (windowName !== openName) {
      setTimeout(() => {
        setIsClosing(true);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [windowName, openName]);

  return !isClosing
    ? createPortal(
        <div className='w-full h-dvh fixed inset-0 bg-black/25 backdrop-blur-sm z-40'>
          <div
            className={`fixed inset-y-0 right-0 w-full smaller:w-96 h-full z-40 ${
              openName ? 'animate-slideIn' : 'animate-slideOut'
            }`}
          >
            <button
              className='bg-none border-none absolute right-1.5 top-2 z-40'
              onClick={close}
            >
              <HiXMark className='size-7 text-gray-700' />
            </button>
            {children}
          </div>
        </div>,
        document.getElementById('modal')!
      )
    : null;
}

Modal.Open = Open;
Modal.Window = Window;
