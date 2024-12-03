export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json']
}