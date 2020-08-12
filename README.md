# easy-console-colors

Add colors to your console with 2 lines of code.

```javascript
import {enableConsoleColors} from 'easy-console-colors';
```
or
```javascript
const {enableConsoleColors} = require('easy-console-colors');
```

```javascript
enableConsoleColors();

console.log("Log", "a", "b");
console.info("Info", "a", "b");
console.warn("Warning", "a", "b");
console.error("Error", "a", "b");
```

Once enabled all console logs accross the process will be colorized. You need to restart the process if you want to disable.

## Default values

```javascript
const defaultLogs = {
    log:   {prefix: '', color: colors.Reset,    suffix: ''},
    info:  {prefix: '', color: colors.FgGreen,  suffix: ''},
    warn:  {prefix: '', color: colors.FgYellow, suffix: ''},
    error: {prefix: '', color: colors.FgRed,    suffix: ''}
}
```

- *prefix* and *suffix*: prepend and append a string to the log value. The color won't be applied to these values, you can contatenate a color to the string.
- *color*: An ansi color code as string or a function that will apply a color to the log value (i.e. chalk).

## Customization

If you don't like default colors or you want to customize the format of your logs, you can override defaults.

```javascript
import {enableConsoleColors, colors} from 'easy-console-colors';

enableConsoleColors({enabled: true,
    logs: {
        log: {prefix: `[${new Date().toLocaleString()}]`,  suffix: `***`},
        warn: {color: colors.FgCyan},
    }
});
```

Above configuration will:

- Override 'log' to prepend date string like [8/12/2020, 10:24:55 AM] and append '***' to the log string.
- Override 'warn' to print messages in cyan instead of yellow.

You can also use default values as base and customize them to your needs.

```javascript
import {enableConsoleColors, colors, defaultLogs} from 'easy-console-colors';

const {log, warn} = defaultLogs;
log.color = colors.FgBlue;

const logs = { log };
```

Above configuration will:

- Override 'log' color to be blue.

## Disable for production environment

```javascript
enableConsoleColors({enabled: process.env.NODE_ENV !== "production"});
```

## Profiles

You can define some kind of profiles to quickly switch between them.

```javascript
const getTimestamp = () => `${colors.FgCyan}[${new Date().toLocaleString()}]`;

const consoleProfiles = {
    default: defaultLogs,
    timestamp: {
        log:   {prefix: getTimestamp(), color: colors.Reset    },
        info:  {prefix: getTimestamp(), color: colors.FgGreen  },
        warn:  {prefix: getTimestamp(), color: colors.FgYellow },
        error: {prefix: getTimestamp(), color: colors.FgRed    }
    },
    chalk: {
        info: {
            prefix: chalk.hex('#a87332')(`[${new Date().toLocaleString()}]`),
            color: chalk.keyword('orange')
        }
    }
}

enableConsoleColors({enabled: true, logs: consoleProfiles.timestamp});
```


## Additional colors

easy-console-colors includes basic ansi colors, but you can use 3rd party tools like chalk to customize your logs.

```javascript
enableConsoleColors({enabled: true,
    logs: {
        info: {prefix: chalk.hex('#a87332')(`[${new Date().toLocaleString()}]`),
        color: chalk.keyword('orange')}
    }
});
```
