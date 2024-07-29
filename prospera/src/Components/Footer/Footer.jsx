import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='footer'>
                <div className='innerFooterCont'>
                    <div className='footerLeft'>
                        <Link to='/' className='footerLogo'>
                            <img src='https://i.postimg.cc/nzYzpgR5/Screenshot-2024-07-18-at-10-21-48-PM-1-removebg-preview.png' alt="logo"/>
                        </Link>
                        <p>Thrive Financially, Live Fully</p>
                    </div>

                    <div className='footerRight'>
                        <div className="footerLinks">
                            <Link to={"/"}><a>Home</a></Link>
                            <Link to={"/about"}><a className='abt'>About</a></Link>
                            <Link to={"/contact"}><a>Contact Us</a></Link>
                        </div>

                        <div className="socials">
                            <a href='https://github.com/Team-Nathan-Mabel-Kailey/site-capstone/tree/main' target="_blank">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDElEQVR4nO2ay0tVQRzHT2JUUNgLCnRRgY/ETNPKyhYJ0YNq1aKlRfYEw1rUKooWkqYmPaxW0T9RURr0MhF60LYyy0VlalGZWvaJ4Q50k3PvnZkzc+8VzgcuyPWc3/f7m3vOPH4znhcSEhISEuIUoAA4ALQB7cBrYBAYkx/x9yv5v8vAfiDfm8wAJUAz0Ic574EmYLk3GQCmANuBTuzzGNgmNLx0BFgFdOOeLqDcSxeAGcAFYJzkIbRagempTj4feEHqeAbkpir51cBnUo8YQSqTnfwWYJj04QewOVnJVwDfST+GnT8JRN75IdKXAWd9ApHePlGH1wGcBm4DIxYT+wnckrHvJLj2qZPRAbioYHR31PULgJPAxwCJfwDqgKyouDsV7jvvYpIzriCc53PvHOCGQfLXgdk+8XIV7v0NrLA5ve1WNJ0VJ04tcAWoBkqBbPlaiU+O/K5aXlMbJ45oUBU6rUybicztVckMLJjYT6aGny02BDs1BOdayTK+nywNP49sLGl1KLCWaWxPi7QcQXEQsWZNsV1Ws/X3VKXpqTGIWJ+G0B8r71xiTxukliq9QWZ9Opy1nm1sb6JKpIP+7JBIDU+VXmCak2z9vU0H3mn422ci0qYhUOMkU3s/0CUTgQ7F4GLOP8tJlvH9zdRYb9wxEehRDH7TSYZqHsWiS4XXJsEHFIM3OMlOzeM5RY/9JsFHFYPXOclOzeMxRY8jJsHHFIMfdZKd3QYYNQn+Jd3G/wCvwKDLTrDdSXZqHu+57AQ7FIP/AuY5yTC+v/lSW4W7JgLXUKfeSZbx/TVo+GszEajRLFoWOcnU31uxZtF1j4lIEXqI9UC2k4z/95Ujt811WGoq9kZTSCyfK6xn/c9PGfBW01NPEMFW9BmVhRRr5TERC2jRmJtE0xJEuBRzvsoKr9hKyzDQzgDWAFdlLFPMS2IC4IlP0CFZ5habJd8UTIh1xV5PEbF+11iLxOOhqmZMgB0+gUVJql7+SnkKnVKXTsFE7hX4NbwuW1U1E22MiAT8OBX1qsRaPInGKjGsSIsdHlM6dTVjAqyMsTUmkl4orzkUw8g9z/16fyKi4cpMdXVHhONR15zxqdie8AwBDhs2QLOpZqJC5HMfsZfRe3DyaWmQQ+HBIOsEYJPhuSE3BVoiO7N+54L2OtIr10y+3/mhKaBSzv0nDovFjmZ+Okdk1tr24AuwUR5MikZMVo5MOMwwNcjjqNEA4sxSlamOEcB6+cj5jQw9cuNiNEhvrNgAn4B1XioAliicG3LZAKLDW2w3K7PRoSnOERoXDSC0GpO5HZcQcSYHeJCEBuhyueS2MW3eKhYhDhrgfjK2360BLJOvRmGAGIWy9J20cpsTTOsBbtyEhISEhIR4kr+i680TiXDwqwAAAABJRU5ErkJggg=="/>
                            </a>
                            <a href="https://www.linkedin.com/school/codepath-org/posts/?feedView=all" target="_blank">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABS0lEQVR4nO2ZO0oEQRRFnyhmOoKmgoHuwD0oOI2GomBm6BZMZMCFuAYzx1EXYqb4YUB7IpMjJR01U3a1HXhreAcqu13F4dXr6o+Z4zh/AtgHRsCE/2cC3AJFW4lLdBm0qYQ6/RSRsJ3UGaaIlOjzmSKSBeYiM1aRZ+AQWK3GMfBKhiI7Krdr6yiyPCXfI0ORYkq+T4Yib8AJsFaN0CMvZCgig7nILFXEEq5JyDxUZ9E6sAgsAdvAOfCeg0g4OHcb1l4BrtVFNhsXt5/cAnAvK9IGYAP4khcB5hMyV7IiwBnwVEUfgdNfskeSIsBBm/dvYEtV5C4y7SiS76mKjCPTjiP5OVWRTvPWcZGAV8R8a0XxHgl4j5j3SBTvETWsyyNKbiIl+nykiIS/p+rcpIgU6LPXKFLJDNDlIkmi9pV9KNIzZdhOyZVwHMfqfANKiIQn/4RZwwAAAABJRU5ErkJggg=="/>
                            </a>
                            <a href="https://www.instagram.com/salesforcefutureforce/?hl=en" target="_blank">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADDUlEQVR4nO2az05TQRSHC2Unf9yLupGqDyHG0voIis+A6CuohAT0CdAE0VAfQAV1g+IOATc2orLEraKpiqUxn5n0ROtkaOmdaTsj8yU36eLOOTO/3jP3nDsnlYpEIpFIJJIU4DBwCXgArAAfgQruqYjtFfE1CgykOgVwHLgP7NI5ysAccKydC+8BJoEd/EHNZQJIt3rxfcAj/OWZCslWxnoR/yk6FwFIAwuEg3oSelwKMEl4TLjc7X8SHjtO3g7APfzjMXAEGAQW69w352LjK+MfgzVzPFrnvrJVskQ1wyNgARSjNgIU8JNFefzV4p80uLdgI8ArxxN/B0wBI8Ap4JBc6ncOmJZ7XFK0EWDL0SRWgWwTfpVAa458f7URoGLpXBVKY0BXAt9dwGUHc/hlI4ANn4FziZ3/nUNWbCWmEwLs7rV44DxwR2L9m1wbwG0gX0eE3ZAEGDPYOgm83MfYZSBjGD8eigCreswDZ4HtJmyoR35Ys9ENrIcgQNbwzzez+FoRhjRb6lXptQAbBhvPSc6ywd57nwWY0sbnsWdEs3nTZwFy2ni129syYytqOwXIaONdpLUbhj3FWwF6tfEl7ClpNnt9FqCvBQL8k8sD/QctBN6GFAK5NmyCKpX2VoBpF4lLg8Tqls8CbBpsLJGcF6ElQqbEJZOwnP0EnHCRWLVbgDVDMTTcpAhq8WcMxdDrEARQjBtsDe2zLljS/3kZf5WEdEKAih4K2ve+GfV6kzyhJL9n9vpuKJtpJSQBkBLYKEKTc8glLKf/YOO8YuNYxl9R8ZvAd7c89h39KLqFG9b1JKmB33zSDc/AF58ORj5IPZ+Xw5BeuU5LhqeSnE2fDkYKhM/8/3g42gwXbAQY8PR4fL+oxo7+xAIopA8vVGZTtlDtxPhOePxQx+fWAiikCTE0rqVcQTUpUX05IbXJpQ9qo+SbljVRU22VfYi/PG1Zq6zWNXpDNhlfUHO53vJm6VqkQeluh/ME9Z6fre0aaztUv9NflLS5aFu6NmBbYnxefNolOZFIJBKJpA40vwE98xtNm5JjEgAAAABJRU5ErkJggg=="/>
                            </a>
                        </div>
                    </div>
                </div>
                <hr /> 
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </div>
        </div>
    )
}

export default Footer
