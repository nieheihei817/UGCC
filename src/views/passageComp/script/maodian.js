const scrollToAnchor = (data) => {
    const hash = data;
    if (hash) {
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }
};

const handleAnchor = (event) => {
    scrollToAnchor(event.target.dataset.hash);
};

const bindClickEvents = () => {
    const lis = document.querySelectorAll('ul li');
    lis.forEach(li => {
        li.addEventListener('click', onLiClick);
    });
};

export { bindClickEvents, scrollToAnchor,handleAnchor };