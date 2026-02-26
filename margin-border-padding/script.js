const liveBox = document.getElementById('live-box');
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');

function getNum(id) {
    var el = document.getElementById(id);
    if (!el) return 0;
    var n = parseInt(el.value, 10);
    return isNaN(n) ? 0 : Math.max(0, n);
}

function getPx(n) {
    return n + 'px';
}

var marginMode = 4;
var paddingMode = 1;
var radiusMode = 1;

function getMarginValues() {
    if (marginMode === 1) {
        var v = getNum('margin-all');
        return [v, v, v, v];
    }
    if (marginMode === 2) {
        var vert = getNum('margin-vertical');
        var horz = getNum('margin-horizontal');
        return [vert, horz, vert, horz];
    }
    return [
        getNum('margin-top'),
        getNum('margin-right'),
        getNum('margin-bottom'),
        getNum('margin-left')
    ];
}

function getPaddingValues() {
    if (paddingMode === 1) {
        var v = getNum('padding-all');
        return [v, v, v, v];
    }
    if (paddingMode === 2) {
        var vert = getNum('padding-vertical');
        var horz = getNum('padding-horizontal');
        return [vert, horz, vert, horz];
    }
    return [
        getNum('padding-top'),
        getNum('padding-right'),
        getNum('padding-bottom'),
        getNum('padding-left')
    ];
}

function getRadiusValues() {
    if (radiusMode === 1) {
        var v = getNum('radius-all');
        return [v, v, v, v];
    }
    if (radiusMode === 2) {
        var r1 = getNum('radius-1');
        var r2 = getNum('radius-2');
        return [r1, r2, r1, r2];
    }
    return [
        getNum('radius-top-right'),
        getNum('radius-top-left'),
        getNum('radius-bottom-right'),
        getNum('radius-bottom-left')
    ];
}

function setMarginMode(mode) {
    marginMode = mode;
    document.querySelectorAll('.margin-inputs').forEach(function (el) { el.classList.add('hidden'); });
    var panel = document.getElementById('margin-inputs-' + mode);
    if (panel) panel.classList.remove('hidden');
    document.querySelectorAll('.btn-mode[data-target="margin"]').forEach(function (btn) {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-mode'), 10) === mode);
    });
    updatePreview();
}

function setPaddingMode(mode) {
    paddingMode = mode;
    document.querySelectorAll('.padding-inputs').forEach(function (el) { el.classList.add('hidden'); });
    var panel = document.getElementById('padding-inputs-' + mode);
    if (panel) panel.classList.remove('hidden');
    document.querySelectorAll('.btn-mode[data-target="padding"]').forEach(function (btn) {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-mode'), 10) === mode);
    });
    updatePreview();
}

function setRadiusMode(mode) {
    radiusMode = mode;
    document.querySelectorAll('.radius-inputs').forEach(function (el) { el.classList.add('hidden'); });
    var panel = document.getElementById('radius-inputs-' + mode);
    if (panel) panel.classList.remove('hidden');
    document.querySelectorAll('.btn-mode[data-target="radius"]').forEach(function (btn) {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-mode'), 10) === mode);
    });
    updatePreview();
}

document.querySelectorAll('.btn-mode[data-target="margin"]').forEach(function (btn) {
    btn.addEventListener('click', function () { setMarginMode(parseInt(this.getAttribute('data-mode'), 10)); });
});
document.querySelectorAll('.btn-mode[data-target="padding"]').forEach(function (btn) {
    btn.addEventListener('click', function () { setPaddingMode(parseInt(this.getAttribute('data-mode'), 10)); });
});
document.querySelectorAll('.btn-mode[data-target="radius"]').forEach(function (btn) {
    btn.addEventListener('click', function () { setRadiusMode(parseInt(this.getAttribute('data-mode'), 10)); });
});

function formatShorthand(values, mode) {
    if (mode === 1) return getPx(values[0]);
    if (mode === 2) return getPx(values[0]) + ' ' + getPx(values[1]);
    return getPx(values[0]) + ' ' + getPx(values[1]) + ' ' + getPx(values[2]) + ' ' + getPx(values[3]);
}

function updatePreview() {
    var m = getMarginValues();
    var p = getPaddingValues();
    var r = getRadiusValues();

    liveBox.style.margin = m.map(getPx).join(' ');
    liveBox.style.padding = p.map(getPx).join(' ');
    liveBox.style.borderRadius = r.map(getPx).join(' ');

    var borderWidth = getNum('border-width');
    var borderStyle = document.getElementById('border-style').value;
    var borderColor = document.getElementById('border-color').value;
    liveBox.style.borderWidth = getPx(borderWidth);
    liveBox.style.borderStyle = borderStyle;
    liveBox.style.borderColor = borderColor;

    var content = document.getElementById('box-content').value;
    liveBox.textContent = content || ' ';

    var bgColor = document.getElementById('box-bg-color').value;
    var textColor = document.getElementById('box-text-color').value;
    liveBox.style.backgroundColor = bgColor;
    liveBox.style.color = textColor;

    var borderStr = borderWidth > 0 ? getPx(borderWidth) + ' ' + borderStyle + ' ' + borderColor : 'none';
    var marginStr = formatShorthand(m, marginMode);
    var paddingStr = formatShorthand(p, paddingMode);
    var radiusStr = formatShorthand(r, radiusMode);

    var cssLines = [
        '.my-box {',
        '  margin: ' + marginStr + ';',
        '  padding: ' + paddingStr + ';',
        '  border: ' + borderStr + ';',
        '  border-radius: ' + radiusStr + ';',
        '  background-color: ' + bgColor + ';',
        '  color: ' + textColor + ';',
        '}'
    ];
    cssCode.textContent = cssLines.join('\n');

    var escaped = (content || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    htmlCode.textContent = '<div class="my-box">' + escaped + '</div>';
}

function copyCode(elementId, buttonEl) {
    var text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(function () {
        var orig = buttonEl.textContent;
        buttonEl.textContent = 'تم النسخ!';
        buttonEl.classList.add('success');
        setTimeout(function () {
            buttonEl.textContent = orig;
            buttonEl.classList.remove('success');
        }, 2000);
    });
}

setPaddingMode(1);
setRadiusMode(1);
setMarginMode(4);
updatePreview();
