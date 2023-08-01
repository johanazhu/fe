import {
    AboutSideBar,
    ArmorySideBar,
    BackEndSideBar,
    BigFrontSideBar,
    BrowserSideBar,
    CSBasicSideBar,
    DesignPatternSideBar,
    DockerSideBar,
    EngineeredSideBar,
    ES6SideBar,
    FrontEndBasicSideBar,
    FrontEndSideBar,
    HttpSideBar,
    InterviewSideBar,
    JSSideBar,
    NodeSideBar,
    PerformanceSideBar,
    ReactSideBar,
    ReadSideBar,
    WebpackSideBar,
} from '../sibeBar';

export default {
    '/Interview': InterviewSideBar(),
    '/JavaScript': JSSideBar(),
    '/TypeScript': JSSideBar(),
    '/ES6': ES6SideBar(),
    '/Browser': BrowserSideBar(),
    '/Performance': PerformanceSideBar(),
    '/React': ReactSideBar(),

    '/Node': NodeSideBar(),

    '/BackEnd': BackEndSideBar(),

    '/webpack': WebpackSideBar(),

    '/WebApp': BigFrontSideBar(),
    '/Flutter': BigFrontSideBar(),

    '/Basic': FrontEndBasicSideBar(),

    '/HTTP': HttpSideBar(),
    '/Docker': DockerSideBar(),

    '/Git': ArmorySideBar(),
    '/Linux': ArmorySideBar(),
    '/DevOps': ArmorySideBar(),

    '/Engineered': EngineeredSideBar(),
    '/MicroFrontend': EngineeredSideBar(),
    '/StandardGuide': EngineeredSideBar(),

    '/DesignPattern': DesignPatternSideBar(),
    '/CSBasic': CSBasicSideBar(),
    '/Read': ReadSideBar(),
    '/About': AboutSideBar(),
    '/Others': AboutSideBar(),
    '/Introduction': FrontEndSideBar(),
};
