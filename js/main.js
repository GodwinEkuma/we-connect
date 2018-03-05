
const openNav = () => {
const dashboardNav = document.getElementById('dashboard-navigation');
const dashboardContent = document.getElementById('dashboard-main');

    if(window.screen.width <= 768 && !(dashboardContent.classList.contains('dashboardContent'))){
        viewMenu(dashboardNav, dashboardContent)
    }else if(window.screen.width <= 768 && dashboardContent.classList.contains('dashboardContent')) {
        removeMenu(dashboardNav, dashboardContent);
    }
}
const viewMenu = (dashboardNav, dashboardContent) => {    
    dashboardNav.classList.add('dashboardNav');
    dashboardContent.classList.add('dashboardContent');
}

const removeMenu = (dashboardNav, dashboardContent) => {
    dashboardNav.classList.remove('dashboardNav');
    dashboardContent.classList.remove('dashboardContent')
}

const openSearch = () => {
    const search = document.getElementById('mobileSearch');
    const searchOverlay = document.getElementById('search-overlay');
    if(window.screen.width <= 768){
        search.classList.add('visible-search');
        searchOverlay.classList.add('body-overlay');
    }
}

const closeSearch = () => {
    const search = document.getElementById('mobileSearch');
    if(search.classList.contains('visible-search')){
        search.classList.remove('visible-search');
        document.body.classList.remove('body-overlay');
    }
}