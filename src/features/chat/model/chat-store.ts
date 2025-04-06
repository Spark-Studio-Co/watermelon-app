import { create } from "zustand";
import user_image from "@/src/images/user_image.png";

type Message = {
    text: string
    date: string
    isMy: boolean
}

type Status = "Online" | "Offline"

interface IChatStore {
    messages: Message[]
    avatar: any,
    status: Status,
    name: string
    setMessage: (text: string) => void
    setAvatar: (avatar: any) => void
    setName: (name: string) => void
    setStatus: (status: Status) => void
}

export const useChatStore = create<IChatStore>(
    (set) => ({
        avatar: user_image,
        status: 'Online',
        name: 'Jack Jallenhell',
        messages: [
            {
                text: 'Lorem ipsum dolor sit amet consectetur. Elit enim sollicitudin malesuada cras viverra aliquam massa. Sed diam nunc adipiscing sem. A libero morbi duis id in. Pulvinar consequat felis habitasse id pretium arcu. Ultrices varius fringilla viverra id amet amet. Id ipsum urna lectus pellentesque ac nisl accumsan blandit phasellus. Fringilla adipiscing at nibh purus nunc. Duis pulvinar quis tellus vel euismod quam',
                date: '05.04.2025',
                isMy: false
            }
        ],
        setMessage: (text: string) => {
            const currentDate = new Date;
            const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`

            const newMessage: Message =
            {
                text: text,
                date: time,
                isMy: true
            }

            set((state) => ({
                messages: [...state.messages, newMessage]
            }))

        },
        setAvatar: (avatar: any) => set({ avatar: avatar }),
        setName: (name: string) => set({ name: name }),
        setStatus: (status: Status) => set({ status: status })
    })
)