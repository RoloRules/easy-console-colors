const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};

const defaultLogs = {
    log:   {prefix: '', color: colors.Reset,    suffix: ''},
    info:  {prefix: '', color: colors.FgGreen,  suffix: ''},
    warn:  {prefix: '', color: colors.FgYellow, suffix: ''},
    error: {prefix: '', color: colors.FgRed,    suffix: ''}
}

const enableConsoleColors = ({enabled = true, logs = {}} = {}) => {
    if (!enabled) { return }
    logs = {...defaultLogs, ...logs};
    Object.keys(logs).forEach(key => {
        if (!Object.keys(defaultLogs).includes(key)) { return }

        let {prefix = ``, color = colors.Reset, suffix = ``} = logs[key];
        let currentLog = console[key];

        console[key] = function () {
            let _args = Array.prototype.slice.call(arguments);

            if (_args.length > 0) {
                if (typeof color === 'function') {
                    _args = _args.map(a => color(a))
                    color = "";
                }
                _args[0] = `${colors.Reset}${prefix ? prefix + ' ' : ''}${colors.Reset}${color}${_args[0]}`;
                _args[_args.length-1] = `${_args[_args.length-1]}${colors.Reset}${suffix ? ' ' + suffix : ''}${colors.Reset}`;
            }

            currentLog.apply(null, _args);
        };
    })
}

module.exports = {
    enableConsoleColors,
    defaultLogs,
    colors
}
