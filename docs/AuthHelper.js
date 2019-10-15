const moment = require('moment')
const Encrypt = require('crypto-js')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const RefreshToken = mongoose.model('RefreshToken')

class AuthHelper {

    static async createTokens(user) {
        const refreshToken = await this.createRefreshToken(user)

        return {
            token: jwt.sign(
                {
                    mail: user.mail
                },
                process.env.SECRETKEY,
                {
                    expiresIn: Number(process.env.JWT_TOKEN_EXPIRATION_TIME)
                }
            ),
            refreshToken: refreshToken.token
        }
    }

    static async createRefreshToken(user) {
        const expirationTime = moment().add(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME, 'seconds').unix()
        const token = Encrypt.SHA256(`${user.mail}.${user.registrationDate}.${expirationTime}`).toString()

        const refreshToken = new RefreshToken({
            token: token,
            expirationDate: expirationTime,
            userId: user.id
        })

        try {
            await refreshToken.validate()
            const refreshTokenStorage = await refreshToken.save()
            this.disableOldRefreshToken(user.id, refreshTokenStorage.id)

            return refreshToken
        } catch (e) {
            return null
        }
    }

    static async refreshToken() {

    }

    static async disableOldRefreshToken(userId, newRefreshTokenId) {
        const tokens = await this.getRefreshTokensBy({userId})

        const tokenIds = []

        tokens.forEach(token => {
            if (token.id === newRefreshTokenId) {
                return
            }

            tokenIds.push(token.id)
        })

        await RefreshToken.updateMany({_id: tokenIds}, {active: false})
    }

    static refreshTokenIsValid(refreshToken) {
        return refreshToken.expirationDate > moment().unix()
    }

    static getRefreshTokensBy(condition) {
        return new Promise(async resolve => {
            try {
                const tokens = await RefreshToken.find(condition)
                resolve(tokens)
            } catch (e) {
                resolve([])
            }
        })
    }

    static getRefreshTokenBy(condition) {
        return new Promise(async resolve => {
            try {
                const token = await RefreshToken.findOne(condition)
                resolve(token)
            } catch (e) {
                resolve(null)
            }
        })
    }

}

module.exports = AuthHelper
