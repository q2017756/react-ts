
import Configs, { LOCALE } from '../Configs'

export interface i18nType {
    Common: any,
    HttpCode: any,
    Options: any,
    App: any
}

export class i18n {
    private static _instance: i18n

    private _locale: string
    private _configs: {[key: string]: i18nType} = {}

    public static get instance(): i18n {
        if (i18n._instance === undefined) {
            i18n._instance = new i18n()
        }
        return i18n._instance
    }

    private constructor() {
        this.get(Configs.DEFAULT.LOCALE)
    }

    public get(locale?: string): i18nType {
        if (locale == undefined) {
            return this._configs[this._locale]
        }

        const _locale = i18n._check(locale)

        if (this._configs[_locale] == undefined) {
            this._configs[_locale] = {
                Common: require('./' + _locale + '/Common/Common'),
                HttpCode: require('./' + _locale + '/Common/HttpCode'),
                Options: require('./' + _locale + '/Common/Options'),
                App: {
                    Home: require('./' + _locale + '/App/Home'),
                    Data: require('./' + _locale + '/App/Data'),
                    DataDetail: require('./' + _locale + '/App/DataDetail'),
                    Feed: require('./' + _locale + '/App/Feed'),
                    FeedBack: require('./' + _locale + '/App/FeedBack'),
                    Forum: require('./' + _locale + '/App/Forum'),
                    Giftpacks: require('./' + _locale + '/App/Giftpacks'),
                    GiftpacksDetail: require('./' + _locale + '/App/GiftpacksDetail'),
                    Login: require('./' + _locale + '/App/Login'),
                    MyFans: require('./' + _locale + '/App/MyFans'),
                    MyFollow: require('./' + _locale + '/App/MyFollow'),
                    NewPosts: require('./' + _locale + '/App/NewPosts'),
                    PostsDetail: require('./' + _locale + '/App/PostsDetail'),
                    Register: require('./' + _locale + '/App/Register'),
                    ResetPwd: require('./' + _locale + '/App/ResetPwd'),
                    SearchResult: require('./' + _locale + '/App/SearchResult'),
                    Setting: require('./' + _locale + '/App/Setting'),
                    SiteHeader: require('./' + _locale + '/App/SiteHeader'),
                    UserHome: require('./' + _locale + '/App/UserHome'),
                    Users: require('./' + _locale + '/App/Users'),
                    UsersMessage: require('./' + _locale + '/App/UsersMessage'),

                },
            }
        }

        this._locale = _locale
        return this._configs[_locale]
    }

    protected static _check(locale: string): string {
        switch (locale) {
            case LOCALE[LOCALE.en_US]:
            case LOCALE[LOCALE.zh_CN]:
                return locale
            default:
                return Configs.DEFAULT.LOCALE
        }
    }
}

export default i18n
