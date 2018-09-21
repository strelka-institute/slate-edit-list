export default function(plugin, change, t) {
    const { value } = change;
    const initialText = value.startBlock.text;
    const initialSelection = value.selection;

    change.call(plugin.changes.wrapInList).undo();

    // Back to previous cursor position
    t.is(change.value.startBlock.text, initialText);
    t.deepEqual(change.value.selection.toJS(), initialSelection.toJS());

    return change;
}
