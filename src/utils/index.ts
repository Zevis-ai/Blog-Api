/**
 * @copyright Zevi Friedman
 * @license Apache-2.0
 */

/**
 * Generete a random user username (e.g , user-abc123)
 */

export const genUsername = (): string => {
    const userNamePrefix = "user-"
    const randomChars = Math.random().toString(36).substring(2)

    return `${userNamePrefix}${randomChars}`
}