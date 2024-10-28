import { useEffect, useRef } from "react"

interface ModalProps {
    closeModal: () => void
}

export function Modal({ closeModal }: ModalProps) {
    const modalRef = useOutClick(() => {
        closeModal()
    })

    const btnRef = useKeyDown("Escape", element => {
        element?.click()
    })

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center"
            role="dialog"
        >
            <div
                className="w-[800px] rounded shadow-shape space-y-5 bg-zinc-950"
                ref={modalRef}
            >
                <div className="flex items-center justify-between py-3 px-5 bg-violet-600 rounded-t">
                    <h1 className="text-zinc-100 font-semibold text-center">
                        😍 Feliz aniversário meu amor!! Hora de dar play neste
                        dia incrível! ▶
                    </h1>
                    <button
                        onClick={() => closeModal()}
                        ref={btnRef}
                        type="button"
                        className="text-slate-100"
                    >
                        <span className="text-sm font-bold">X</span>
                    </button>
                </div>
                <div className="flex flex-col items-center px-2 py-5">
                    <iframe
                        title="Birthday Video"
                        style="width: 560; height: 315;"
                        src="https://www.youtube.com/embed/jo-01q8Ko08?si=utd-OJRnMEUr0Aam"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

function useOutClick(callbackfn: () => void) {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                if (callbackfn) callbackfn()
            }
        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    }, [])

    return ref
}

function useKeyDown(
    keyId: string,
    callbackfn: (e: HTMLButtonElement | null) => void
) {
    const ref = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === keyId) {
                if (callbackfn) callbackfn(ref.current)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return ref
}
