﻿module Inknote.Managers {

    export enum Page{

        Score,
        Form,
        File,
        List,
        Licence,
        Print

    }

    function pageName(page: Page): string {

        switch (page) {
            case Page.Score:
                return "Score";
            case Page.Form:
                return "Form";
            case Page.File:
                return "File";
            case Page.List:
                return "List";
            case Page.Licence:
                return "Licence";
            case Page.Print:
                return "Print";
        }
    }

    export class PageManager {

        private _page: Page;

        get page() {
            return this._page;
        }

        set page(item: Page) {
            var pageURL = "?" + pageName(item);

            if (Menu.isMenuOpen) {
                Menu.toggle();
            }
            Menu.closeAllSubMenus();

            RightClickMenuService.Instance.visible = false;

            if (ScrollService && ScrollService.Instance) {
                ScrollService.Instance.x = 0;
                ScrollService.Instance.y = 0;
            }

            if (item == Page.Score) {
                FrontEnd.showElement(document.getElementById("play"));
            }
            else {
                FrontEnd.hideElement(document.getElementById("play"));
            }

            switch (item) {
                case Page.File:
                    break;
                case Page.Form:
                    break;
                case Page.List:
                    break;
                case Page.Print:
                case Page.Score:
                    pageURL += "=" + ProjectManager.Instance.currentProject.ID;
                    break;
                case Page.Licence:
                    window.location.href = "./licence";
                    return;
            }

            window.history.pushState(null, pageURL, pageURL);
            this._page = item;
        }

        private static _current: PageManager;

        static get Current(): PageManager {

            if (!PageManager._current) {
                PageManager._current = new PageManager();
            }

            return PageManager._current;
        }

        openNewPage(page: Page, ID: string): any {
            var newURL = "?"; 
            console.log(newURL);
            
            newURL += pageName(page);
            newURL += "=";
            newURL += ID;

            return window.open(newURL);
        }

        openPageFromURL() {
            var search = window.location.search.replace("?","");
            var searches = search.split("&");
            
            for (var i = 0; i < searches.length; i++){
                var keyValue = searches[i].split("=");
                if (Page[keyValue[0]]) {
                    this.page = Page[keyValue[0]];
                }
            }

            if (this._page == null) {
                this.page = Page.Score;
            }
        }

        constructor() {
            this.openPageFromURL();
        }

    }

} 