const token = "7342678753:AAHOPZKPT9cJHUioNTaZFuTTGxssGzoN7s8";

const getChatIDs = async () => {
    const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const data = await response.json();

    if (data.ok && data.result.length > 0) {
        // Use a Set to store unique chat IDs
        const chatIDs = new Set();
        
        data.result.forEach(update => {
            if (update.message && update.message.chat && update.message.chat.id) {
                chatIDs.add(update.message.chat.id);
            }
        });

        // Send a message to each unique chat ID
        chatIDs.forEach(chatID => {
            sendMessage(chatID);
        });
    } else {
        console.log('No messages found');
    }

    console.log(data);
}

const sendMessage = async (chatID) => {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=Hello+from+my+bot!`, {
        method: "GET",
    });
    const data = await response.json();  
    console.log(`Message sent to ${chatID}:`, data);
}

getChatIDs();
