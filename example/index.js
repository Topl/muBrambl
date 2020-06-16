const brambljs = new BramblJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co/',
        apiKey: 'Ku6v7NUyFFFkhqN5',
    },
    KeyManager: {
        password: 'password',
        keyStore: {
            publicKeyId: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
            crypto: {
                cipher: 'aes-256-ctr',
                cipherText: 'CP5EKt792bPgijmZ129nnVsi3LwL1rN98aNmexATTGx2',
                cipherParams: { iv: 'QetaiStk9HwfkJAf6zmuQb' },
                mac: '71DqsZdGTaS7kNPWDEFUg4XScDxVULzEFkHxhdMYeo8Q',
                kdf: 'scrypt',
                kdsfSalt: 'FoxVcL6TJnU8RMW8W8vacdhjS5RdvcqvmzvjtsunVQeN',
            },
        },
    },
});
function copyToClipboard() {
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val(brambljs.keyManager.pk).select();
    document.execCommand('copy');
    $temp.remove();
}
let miniButton = $('button.mini');
miniButton.html("<i class='copy icon'></i>" + brambljs.keyManager.pk.substr(0, 5) + '...');
miniButton.popup({
    content: 'Copy text to clipboard',
    on: 'hover',
});
miniButton.click(function () {
    copyToClipboard();
});
