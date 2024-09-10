import { useEffect } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Head1(props) {
    useEffect(() => {
        const scrollers = document.querySelectorAll(".scroller");
        addAnimation(scrollers);
    }, []);

    function addAnimation(scrollers) {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    return (
        <div id="body" className="scroller" data-speed="fast">
            <ul className="tag-list scroller__inner">
            <li className='Pomo'><Link className="links" to="/orbit">Orbit: Pomodoro</Link></li>
                <li className='Home'><Link className="links">Others coming soon</Link></li>
                <li className='plan'><Link className='links' to="/planet">Planet: Stopwatch</Link></li>
                <li className='lam'><Link className="links" to="/lamp">Lamp: Timer</Link></li>
            </ul>
        </div>
    );
}

export default Head1;
