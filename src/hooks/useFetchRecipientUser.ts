import { useEffect, useState } from "react";
import { BASE_URL, getRequest } from "../../service/config";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const recipientId = chat?.members.find((id) => id !== user?._id);

        const getUser = async () => {
            if (!recipientId) return;

            const response = await getRequest(`${BASE_URL}/api/users/find/${recipientId}`);
            if (response.error) {
                setError(response.error);
            } else {
                setRecipientUser(response);
            }
        };

        getUser();
    }, [chat, user]);  // chat ve user değişikliklerinde hook yeniden çalışsın

    return { recipientUser, error };
}
