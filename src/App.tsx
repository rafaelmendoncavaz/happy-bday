import { useState } from "react"
import { Modal } from "./Modal"
import scaryphoto from "./assets/exorcist.jpg"

function App() {
    const [modalStatus, setModalStatus] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [jumpScare, setJumpScare] = useState<boolean>(false)

    const scream = new Audio("./src/assets/jumpscare.wav")
    scream.loop = true

    const closeModal = () => {
        setModalStatus(false)
    }

    function handleSurprise() {
        if (password !== "arra090621") {
            setPassword("")
            scream.play()
            setJumpScare(true)
            return
        }

        setModalStatus(true)
        setPassword("")
    }

    return (
        <main className="h-screen flex items-center justify-center">
            {jumpScare ? (
                <div>
                    <img src={scaryphoto} alt="Jumpscare" />
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 w-[640px] h-[640px] items-center justify-center bg-filler bg-no-repeat bg-center">
                        <div className="flex flex-col space-y-10 w-full px-6 text-center">
                            <label
                                htmlFor="password"
                                className="font-bold text-lg"
                            >
                                💕 Insira a senha super secreta! 💕
                            </label>
                            <input
                                type="password"
                                name="senha"
                                id="password"
                                className="w-full rounded-lg bg-zinc-900 shadow-shape outline-none px-4 py-2"
                                placeholder="Melhor não errar!"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="button"
                                className="rounded-lg shadow-shape px-2 py-2 bg-violet-500 hover:bg-violet-600 font-bold text-base self-center"
                                onClick={() => handleSurprise()}
                            >
                                Acessar minha surpresa!
                            </button>
                        </div>
                    </div>
                </>
            )}
            {modalStatus && <Modal closeModal={closeModal} />}
        </main>
    )
}

export default App
