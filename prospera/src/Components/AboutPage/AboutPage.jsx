import './AboutPage.css'
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div id="aboutPage">
            <div className='aboutBody'>
                <div className='leftAboutBody'>
                    <div className='leftAboutTextArea'>
                        <h1>MAKE IT POSSIBLE WITH</h1>
                        <span>P R O S P E R A</span>
                    </div>
                </div>

                <div className='rightAboutBody'>
                    <p className='.reveal-type'>Managing finances can be challenging, especially for young adults transitioning into independence and immigrants adapting to a new financial landscape. Our web app aims to simplify and streamline personal finance management, providing users with the resources and guidance they need to achieve financial stability and growth.</p>
                    <Link to={`/login`} >
                    </Link>
                </div>
            </div>
            
            <div className='teamAbout'>
                    <div className='team'>
                        <h2>MEET TEAM MKNFORCE!</h2>
                        <div className='teamIcons'>
                            <div className='teamMember'>
                                <img src='https://ca.slack-edge.com/E7T5PNK3P-U07685Z465A-b44ceb4c18af-512' alt='team member' />
                                <h3>Mabel Inoa Mejia</h3>
                                <p>Software Developer</p>
                                <div className='teamSocials'>
                                    <a href='https://github.com/M-a-b-e-l/' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0UlEQVR4nO2aSWsVQRCAv4iiAcUVFMxBhRgVjfuuBwVxQT158KjiLijqQU+ieBC3aHD3JP4JDZoIblEEF7y6m4P7gnE3iRT0g8djxnT1TPc8YT4oCC8ztfTMdFdXNeTk5OTk5PhmBLAeOAU0Ao+BD8AvI/L3I/O/k8A6oIb/nHFAHdACdDjKS+AwMJb/hApgCdCcIOg4uQksNjbKkinAHQ+Bl8ptYBJlRCVwDGgLEHxBxFY90CPr4GuABwEDL5V7QHVWwU8F3mUYfEFkBZkVOviFwLcyCL4gX4EFoYKfBrSWQdCl8i3Em1ADfCyDYOPkvc85odJiwmsC9gANwI8UA/sOXDS6L3Vy7V1fq8NxC0dXFl0/ENgFvE4Q+CtgK9C7SO8yi/uO+khy2iwMD4+4ty9w3iH4c0CfCH3VFvf+ASakFXyFIsMrflKlbAZOAyuA8cBg81mJVJnfVphr5No4+lr60pxW2rxE8dS64p+uCn9kuU5Ms8JgP/zTW+HPjTS2tB0KkX2/b4YofapNYqxOaWw5/pmr9OlgEmMtCkPtaX1znTDH2LL163mSrK9DIfsJx2Glb07Z4XrlKHcnHJLpvVD4t9bFyCmFgTWER/OATrgYaLJULjl/L8LTU7HfkP2DmqeWyi+QHQ2WPkoZXs17S+UHyI5Dlj6+dVH+01K57NayYrviM1Xzy1L5Nsp/AORhqvlUhuu/6ycghVNvk2Aj2XHF5yTYZKn8N9Cf8Awwtm18vOxi4KylcpF9hOeAwj9J6tSsURYtRxOOWmXRdZWLkdEKA4X9gJS5fFNl2uYa30a6GnuiNNRiGie+mAg8U/okk7kz9UpjhTW3LuXymOg6oshNikXuc2a8g8GCfDYVXnkjujjYlnumA2eMLlc/EpXEhFsRSj+a0rU0S75YOCH7itXYs1axF/mXXCcFlkYobjdLXxfTDHlpcapDUzCpjBl4rSxKYwAqTABRBnYXfSpxm6d2U13WMs50eFyDl3J+akyOaY1J0IPMNRtjHJF01fd+v1T+mBUjVepjjO0oumZvRMV2ZwKbmxwHQFYhL4XI+xHGHpb04CabNFWc2JBwnzDf8dyQtwJtdcy5IM0Mr2GSMvi3IQ5NzTK5f+mymHi9jWCi8ojMDAIxzxxMKnZAkpUtJS3ybglfR9sBaDUts6DMNq9c1Mrw1DQufiacjW0G4A0wk4wYZnFuyOcAyIQ3lIzpYXp1bQEHoM10fUO24zpFzuRcCzAAtz1vuRNRYfLv6x4G4Gqg9ntqjDGfxqgEOkaZ0nfIcpsXXOsBOTk5OTk5+OMvJumzTKKLQPIAAAAASUVORK5CYII="/></a>
                                    <a href='https://www.linkedin.com/in/mabel-i-m-/' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2ZvUoDQRSFP1Hs/AFtBQt9A99BwV20FIV0lr6CjQTyID6DnSbqg9gp/iDopkpzZWEaw+zOzFrsHbkHThNuZs+Xu3dmk4DJZOqqI2ACTAHp2VNgDJSpECMF4aXBw5ROiHIXMSATBUEl4LsYkEpBUAn4OwZEMnFQfQcUA5lT2yfyApwAG85nwFuOHdlXtF0H1fbmVU/9Wo4gpae+yBHkHRgAm871jLzmCCKKHFTfAcVA5tSlnSk1j+4s2gKWgRVgD7gEPnIAqQ/Og8C114Eb7SA7MRcHloAHzSAp2gZmOYAsRtRcawa5AJ5d3RNw3lJ7qhXkOPH7965WkPuGNevfCOjwMNobyGfDmvXrPi1oBfnrumIgWEe8slsLmxFs1xL/eNiMiJ0jtG+TmhzUvwGpFISUgL9iQMYKgkrAtzEgpYKgEvAhkRoqCCsNviJRhfv3VMPMVO52iu6EyWTil34AFdRDhxtrT8cAAAAASUVORK5CYII="/></a>
                                </div>
                            </div>
                            <div className='teamMember'>
                                <img src='https://ca.slack-edge.com/T06TC06DGC8-U06T1RV0MCH-2dffecccbd1d-512' alt='team member' />
                                <h3>Kailey Chavez</h3>
                                <p>Software Developer</p>
                                <div className='teamSocials'>
                                    <a href='https://github.com/kaileychavez165' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0UlEQVR4nO2aSWsVQRCAv4iiAcUVFMxBhRgVjfuuBwVxQT158KjiLijqQU+ieBC3aHD3JP4JDZoIblEEF7y6m4P7gnE3iRT0g8djxnT1TPc8YT4oCC8ztfTMdFdXNeTk5OTk5PhmBLAeOAU0Ao+BD8AvI/L3I/O/k8A6oIb/nHFAHdACdDjKS+AwMJb/hApgCdCcIOg4uQksNjbKkinAHQ+Bl8ptYBJlRCVwDGgLEHxBxFY90CPr4GuABwEDL5V7QHVWwU8F3mUYfEFkBZkVOviFwLcyCL4gX4EFoYKfBrSWQdCl8i3Em1ADfCyDYOPkvc85odJiwmsC9gANwI8UA/sOXDS6L3Vy7V1fq8NxC0dXFl0/ENgFvE4Q+CtgK9C7SO8yi/uO+khy2iwMD4+4ty9w3iH4c0CfCH3VFvf+ASakFXyFIsMrflKlbAZOAyuA8cBg81mJVJnfVphr5No4+lr60pxW2rxE8dS64p+uCn9kuU5Ms8JgP/zTW+HPjTS2tB0KkX2/b4YofapNYqxOaWw5/pmr9OlgEmMtCkPtaX1znTDH2LL163mSrK9DIfsJx2Glb07Z4XrlKHcnHJLpvVD4t9bFyCmFgTWER/OATrgYaLJULjl/L8LTU7HfkP2DmqeWyi+QHQ2WPkoZXs17S+UHyI5Dlj6+dVH+01K57NayYrviM1Xzy1L5Nsp/AORhqvlUhuu/6ycghVNvk2Aj2XHF5yTYZKn8N9Cf8Awwtm18vOxi4KylcpF9hOeAwj9J6tSsURYtRxOOWmXRdZWLkdEKA4X9gJS5fFNl2uYa30a6GnuiNNRiGie+mAg8U/okk7kz9UpjhTW3LuXymOg6oshNikXuc2a8g8GCfDYVXnkjujjYlnumA2eMLlc/EpXEhFsRSj+a0rU0S75YOCH7itXYs1axF/mXXCcFlkYobjdLXxfTDHlpcapDUzCpjBl4rSxKYwAqTABRBnYXfSpxm6d2U13WMs50eFyDl3J+akyOaY1J0IPMNRtjHJF01fd+v1T+mBUjVepjjO0oumZvRMV2ZwKbmxwHQFYhL4XI+xHGHpb04CabNFWc2JBwnzDf8dyQtwJtdcy5IM0Mr2GSMvi3IQ5NzTK5f+mymHi9jWCi8ojMDAIxzxxMKnZAkpUtJS3ybglfR9sBaDUts6DMNq9c1Mrw1DQufiacjW0G4A0wk4wYZnFuyOcAyIQ3lIzpYXp1bQEHoM10fUO24zpFzuRcCzAAtz1vuRNRYfLv6x4G4Gqg9ntqjDGfxqgEOkaZ0nfIcpsXXOsBOTk5OTk5+OMvJumzTKKLQPIAAAAASUVORK5CYII="/></a>
                                    <a href='https://www.linkedin.com/in/kaileychavez165/' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2ZvUoDQRSFP1Hs/AFtBQt9A99BwV20FIV0lr6CjQTyID6DnSbqg9gp/iDopkpzZWEaw+zOzFrsHbkHThNuZs+Xu3dmk4DJZOqqI2ACTAHp2VNgDJSpECMF4aXBw5ROiHIXMSATBUEl4LsYkEpBUAn4OwZEMnFQfQcUA5lT2yfyApwAG85nwFuOHdlXtF0H1fbmVU/9Wo4gpae+yBHkHRgAm871jLzmCCKKHFTfAcVA5tSlnSk1j+4s2gKWgRVgD7gEPnIAqQ/Og8C114Eb7SA7MRcHloAHzSAp2gZmOYAsRtRcawa5AJ5d3RNw3lJ7qhXkOPH7965WkPuGNevfCOjwMNobyGfDmvXrPi1oBfnrumIgWEe8slsLmxFs1xL/eNiMiJ0jtG+TmhzUvwGpFISUgL9iQMYKgkrAtzEgpYKgEvAhkRoqCCsNviJRhfv3VMPMVO52iu6EyWTil34AFdRDhxtrT8cAAAAASUVORK5CYII="/></a>
                                </div>
                            </div>
                            <div className='teamMember'>
                                <img src='https://ca.slack-edge.com/E7T5PNK3P-U076UF9NBME-0edbd7b74d3f-512' alt='team member' />
                                <h3>Nathan Quiroa</h3>
                                <p>Software Developer</p>
                                <div className='teamSocials'>
                                    <a href='https://github.com/nquiroa' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0UlEQVR4nO2aSWsVQRCAv4iiAcUVFMxBhRgVjfuuBwVxQT158KjiLijqQU+ieBC3aHD3JP4JDZoIblEEF7y6m4P7gnE3iRT0g8djxnT1TPc8YT4oCC8ztfTMdFdXNeTk5OTk5PhmBLAeOAU0Ao+BD8AvI/L3I/O/k8A6oIb/nHFAHdACdDjKS+AwMJb/hApgCdCcIOg4uQksNjbKkinAHQ+Bl8ptYBJlRCVwDGgLEHxBxFY90CPr4GuABwEDL5V7QHVWwU8F3mUYfEFkBZkVOviFwLcyCL4gX4EFoYKfBrSWQdCl8i3Em1ADfCyDYOPkvc85odJiwmsC9gANwI8UA/sOXDS6L3Vy7V1fq8NxC0dXFl0/ENgFvE4Q+CtgK9C7SO8yi/uO+khy2iwMD4+4ty9w3iH4c0CfCH3VFvf+ASakFXyFIsMrflKlbAZOAyuA8cBg81mJVJnfVphr5No4+lr60pxW2rxE8dS64p+uCn9kuU5Ms8JgP/zTW+HPjTS2tB0KkX2/b4YofapNYqxOaWw5/pmr9OlgEmMtCkPtaX1znTDH2LL163mSrK9DIfsJx2Glb07Z4XrlKHcnHJLpvVD4t9bFyCmFgTWER/OATrgYaLJULjl/L8LTU7HfkP2DmqeWyi+QHQ2WPkoZXs17S+UHyI5Dlj6+dVH+01K57NayYrviM1Xzy1L5Nsp/AORhqvlUhuu/6ycghVNvk2Aj2XHF5yTYZKn8N9Cf8Awwtm18vOxi4KylcpF9hOeAwj9J6tSsURYtRxOOWmXRdZWLkdEKA4X9gJS5fFNl2uYa30a6GnuiNNRiGie+mAg8U/okk7kz9UpjhTW3LuXymOg6oshNikXuc2a8g8GCfDYVXnkjujjYlnumA2eMLlc/EpXEhFsRSj+a0rU0S75YOCH7itXYs1axF/mXXCcFlkYobjdLXxfTDHlpcapDUzCpjBl4rSxKYwAqTABRBnYXfSpxm6d2U13WMs50eFyDl3J+akyOaY1J0IPMNRtjHJF01fd+v1T+mBUjVepjjO0oumZvRMV2ZwKbmxwHQFYhL4XI+xHGHpb04CabNFWc2JBwnzDf8dyQtwJtdcy5IM0Mr2GSMvi3IQ5NzTK5f+mymHi9jWCi8ojMDAIxzxxMKnZAkpUtJS3ybglfR9sBaDUts6DMNq9c1Mrw1DQufiacjW0G4A0wk4wYZnFuyOcAyIQ3lIzpYXp1bQEHoM10fUO24zpFzuRcCzAAtz1vuRNRYfLv6x4G4Gqg9ntqjDGfxqgEOkaZ0nfIcpsXXOsBOTk5OTk5+OMvJumzTKKLQPIAAAAASUVORK5CYII="/></a>
                                    <a href='https://www.linkedin.com/in/nathan-quiroa/' target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2ZvUoDQRSFP1Hs/AFtBQt9A99BwV20FIV0lr6CjQTyID6DnSbqg9gp/iDopkpzZWEaw+zOzFrsHbkHThNuZs+Xu3dmk4DJZOqqI2ACTAHp2VNgDJSpECMF4aXBw5ROiHIXMSATBUEl4LsYkEpBUAn4OwZEMnFQfQcUA5lT2yfyApwAG85nwFuOHdlXtF0H1fbmVU/9Wo4gpae+yBHkHRgAm871jLzmCCKKHFTfAcVA5tSlnSk1j+4s2gKWgRVgD7gEPnIAqQ/Og8C114Eb7SA7MRcHloAHzSAp2gZmOYAsRtRcawa5AJ5d3RNw3lJ7qhXkOPH7965WkPuGNevfCOjwMNobyGfDmvXrPi1oBfnrumIgWEe8slsLmxFs1xL/eNiMiJ0jtG+TmhzUvwGpFISUgL9iQMYKgkrAtzEgpYKgEvAhkRoqCCsNviJRhfv3VMPMVO52iu6EyWTil34AFdRDhxtrT8cAAAAASUVORK5CYII="/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AboutPage
