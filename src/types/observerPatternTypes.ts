export interface Subject {
    registerObserver: Function;
    removeObserver: Function;
    notifyObserver: Function;
}

export interface Observer {
    update: Function;
}
