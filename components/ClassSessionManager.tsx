"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const STATES = ["MA", "NH", "RI", "VT"] as const;

type Member = { id: string; firstName: string; lastName: string; email: string };
type Rsvp = { id: string; member: Member };
type Session = { id: string; dayOfWeek: string; time: string; location: string; state: string; rsvps: Rsvp[] };
type FormValues = { dayOfWeek: string; time: string; location: string; state: string };

const emptyForm: FormValues = { dayOfWeek: "Monday", time: "", location: "", state: "MA" };

const fieldClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

function SessionFormFields({
  values,
  onChange,
}: {
  values: FormValues;
  onChange: (v: FormValues) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label className={labelClass}>Day of Week</label>
        <select className={fieldClass} value={values.dayOfWeek} onChange={(e) => onChange({ ...values, dayOfWeek: e.target.value })}>
          {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label className={labelClass}>Time</label>
        <input
          type="text"
          className={fieldClass}
          placeholder="e.g. 10:00 AM – 11:30 AM"
          value={values.time}
          onChange={(e) => onChange({ ...values, time: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          className={fieldClass}
          placeholder="e.g. Boston Community Center"
          value={values.location}
          onChange={(e) => onChange({ ...values, location: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>State</label>
        <select className={fieldClass} value={values.state} onChange={(e) => onChange({ ...values, state: e.target.value })}>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}

export default function ClassSessionManager({
  classId,
  sessions,
}: {
  classId: string;
  sessions: Session[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<FormValues>(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormValues>(emptyForm);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function refresh() {
    startTransition(() => router.refresh());
  }

  async function handleCreate() {
    setError("");
    if (!addForm.time.trim() || !addForm.location.trim()) {
      setError("Time and location are required.");
      return;
    }
    const res = await fetch("/api/admin/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, ...addForm }),
    });
    if (!res.ok) { setError("Failed to create session."); return; }
    setShowAdd(false);
    setAddForm(emptyForm);
    refresh();
  }

  function startEdit(s: Session) {
    setEditingId(s.id);
    setEditForm({ dayOfWeek: s.dayOfWeek, time: s.time, location: s.location, state: s.state });
    setConfirmDeleteId(null);
    setShowAdd(false);
  }

  async function handleUpdate() {
    if (!editingId) return;
    setError("");
    const res = await fetch(`/api/admin/sessions/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (!res.ok) { setError("Failed to update session."); return; }
    setEditingId(null);
    refresh();
  }

  async function handleDelete(id: string) {
    setError("");
    const res = await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" });
    if (!res.ok) { setError("Failed to delete session."); return; }
    setConfirmDeleteId(null);
    if (expandedId === id) setExpandedId(null);
    refresh();
  }

  return (
    <div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {sessions.length === 0 && !showAdd && (
        <p className="text-gray-400 text-sm italic py-1">No sessions yet — add one below.</p>
      )}

      {/* Session rows */}
      <div className="space-y-2 mb-3">
        {sessions.map((s) => (
          <div key={s.id} className="border rounded-xl overflow-hidden">

            {editingId === s.id ? (
              /* ── Edit form ── */
              <div className="p-4 bg-teal-50 border-teal-200">
                <p className="text-sm font-semibold text-teal-800 mb-3">Edit Session</p>
                <SessionFormFields values={editForm} onChange={setEditForm} />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleUpdate}
                    disabled={isPending}
                    className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 border text-sm font-medium rounded-lg hover:bg-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── Session info row ── */
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Info */}
                  <div className="flex flex-wrap items-center gap-3 text-base">
                    <span className="bg-teal-100 text-teal-800 text-sm font-bold px-2.5 py-0.5 rounded-full">{s.state}</span>
                    <span className="font-semibold text-gray-900">{s.dayOfWeek}</span>
                    <span className="text-gray-600">🕐 {s.time}</span>
                    <span className="text-gray-600">📍 {s.location}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                      className="text-sm text-teal-600 hover:underline font-medium whitespace-nowrap"
                    >
                      {s.rsvps.length} registered {expandedId === s.id ? "▲" : "▼"}
                    </button>
                    <button
                      onClick={() => startEdit(s)}
                      className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                      Edit
                    </button>
                    {confirmDeleteId === s.id ? (
                      <>
                        <button
                          onClick={() => handleDelete(s.id)}
                          disabled={isPending}
                          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 transition-colors"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => { setConfirmDeleteId(s.id); setEditingId(null); }}
                        className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded RSVP member list */}
                {expandedId === s.id && (
                  <div className="mt-3 pt-3 border-t">
                    {s.rsvps.length === 0 ? (
                      <p className="text-gray-400 text-sm italic">No members registered yet.</p>
                    ) : (
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider grid grid-cols-2">
                          <span>Member</span>
                          <span>Email</span>
                        </div>
                        <div className="divide-y">
                          {s.rsvps.map((r) => (
                            <div key={r.id} className="px-3 py-2.5 grid grid-cols-2 text-sm">
                              <span className="font-medium text-gray-900">{r.member.firstName} {r.member.lastName}</span>
                              <span className="text-gray-500 truncate">{r.member.email}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Add session form */}
      {showAdd ? (
        <div className="border border-teal-200 rounded-xl p-4 bg-teal-50">
          <p className="text-sm font-semibold text-teal-800 mb-3">New Session</p>
          <SessionFormFields values={addForm} onChange={setAddForm} />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleCreate}
              disabled={isPending}
              className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              Add Session
            </button>
            <button
              onClick={() => { setShowAdd(false); setAddForm(emptyForm); setError(""); }}
              className="px-4 py-2 border text-sm font-medium rounded-lg hover:bg-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => { setShowAdd(true); setEditingId(null); setConfirmDeleteId(null); }}
          className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center gap-1 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add Session
        </button>
      )}
    </div>
  );
}
